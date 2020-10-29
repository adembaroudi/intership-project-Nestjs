import { Model } from "mongoose";
import { replyCommentDto } from "./dto/replyComment.dto";
import { replyComment } from "./replyComment.model";
export declare class replyCommentService {
    private readonly commentModel;
    private readonly replyModel;
    private comment;
    private replyComment;
    constructor(commentModel: Model<Comment>, replyModel: Model<replyComment>);
    repComment(id: String, replyDto: replyCommentDto): Promise<replyComment>;
    getReplyByComment(id: String): Promise<any>;
    nbrReplies(id: String): Promise<replyComment>;
}
