import { replyCommentDto } from "./dto/replyComment.dto";
import { replyCommentService } from "./replyComment.service";
export declare class replyCommentController {
    private replyService;
    constructor(replyService: replyCommentService);
    NewComment(id: string, replyDto: replyCommentDto): Promise<import("./replyComment.model").replyComment>;
    getReplyByComment(id: String, replyDto: replyCommentDto): Promise<import("./replyComment.model").replyComment>;
}
