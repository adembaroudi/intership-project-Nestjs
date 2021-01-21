import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { replyCommentDto } from "./dto/replyComment.dto";
import { replyComment } from "./replyComment.model";

@Injectable()
export class replyCommentService {
  private comment: Comment[] = [];
  private replyComment: replyComment[] = [];

  constructor(
    @InjectModel("comment") private readonly commentModel: Model<Comment>,
    @InjectModel("replies") private readonly replyModel: Model<replyComment>
  ) {}
  async repComment(
    id: String,
    replyDto: replyCommentDto
  ): Promise<replyComment> {
    const repcomment = await this.replyModel.create(replyDto);
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      {
        $push: { replies: repcomment._id },
      },
      {
        new: true,
      }
    );
    await this.replyModel.findByIdAndUpdate(repcomment._id, { 
      comment: comment._id, 
    });
    return comment;
  }
  async getReplyByComment(id : String): Promise <any>{
    const getReplyByComment = await this.commentModel.findById(id).populate("replies").exec()
    return getReplyByComment;
  }
  async nbrReplies(id : String):Promise<replyComment>{
    const nbrReplies = await this.replyModel.countDocuments({comment : id})
    return nbrReplies
    } 
    async deleteReplies(id : String){
      const repliqueToDelete = await this.replyModel.findByIdAndDelete(id)
      await this.commentModel.findByIdAndUpdate(repliqueToDelete.comment,{$pull:{
        replies : repliqueToDelete._id}
      })  
      return {message : "reply deleted"}
    }
}
   