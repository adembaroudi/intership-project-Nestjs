import { replyCommentDto } from "./dto/replyComment.dto";
import { replyCommentService } from "./replyComment.service";
export declare class replyCommentController {
    private replyService;
    constructor(replyService: replyCommentService);
    NewComment(idcomment: string, replyDto: replyCommentDto): Promise<import("./replyComment.model").replyComment>;
    getReplyByComment(idcomment: String): Promise<any>;
    nbrComments(idcomment: String): Promise<import("./replyComment.model").replyComment>;
    deleteReplies(idreply: String, res: any): Promise<any>;
}
