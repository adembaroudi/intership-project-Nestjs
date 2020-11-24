import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogDto } from "src/blog/dto/blog.dto";
import { Blog } from "./comment.model";
import { CommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  private comment: Comment[] = [];
  private blog: Blog[] = [];

  constructor(
    @InjectModel("comment") private readonly commentModel: Model<Comment>,
    @InjectModel("blog") private readonly blogModel: Model<Blog>
  ) {}
  async newComment(id: String, CommentDto: CommentDto): Promise<Comment> {
    const comment = await this.commentModel.create(CommentDto);
    const blog = await this.blogModel.findByIdAndUpdate(
      id,
      {
        $push: { comment: comment._id },
      },
      {
        new: true,
      }
    );
    await this.commentModel.findByIdAndUpdate(comment._id,{blog:blog._id})
    return blog;
  }
  async getAllComments():Promise<Comment> {
    const allComments = await this.commentModel.find()
    return allComments;
  }
  async getCommentByBlog(id : String ): Promise <any>{
    const commentsByBlog = await this.blogModel.findById(id).populate("comment").exec() 
    return commentsByBlog;
  }
  async getCommentById(id : String ): Promise <any>{
    const commentsById = await this.commentModel.findById(id).populate("replies").exec() 
    return commentsById;
  }
  async nbrComments(id :String) : Promise <Comment>{
       const nbrComments = await this.commentModel.countDocuments({blog : id })
       return nbrComments
  }
  async updateComment(idcomment : String ,  CommentDto : CommentDto) : Promise<Comment>{
      const comment = await  this.commentModel.findByIdAndUpdate(idcomment , {contenue :CommentDto.contenue},{new : true});
      return comment
  }
  async deleteComment(id : String){
    const commentToDelete = await this.commentModel.findByIdAndDelete(id)
    await this.blogModel.findByIdAndUpdate(commentToDelete.blog,{$pull:{
        comment : commentToDelete._id}
    })  
    return {message : "comment deleted"}
  }
}

