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
    @InjectModel("replaycomments")
    private readonly replyModel: Model<replyComment>
  ) {}
  async repComment(
    id: String,
    replyDto: replyCommentDto
  ): Promise<replyComment> {
    const repcomment = await this.replyModel.create(replyDto);
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      {
        $push: { repcomment: repcomment._id },
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
  async getReplyByComment(id : String , replyDto : replyCommentDto): Promise <replyComment>{
    const replyByComment = await this.commentModel.findById(id, replyDto)  
    return replyByComment;
  }
}
