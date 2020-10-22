import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    NewComment(id: string, res: any, CommentDto: CommentDto): Promise<any>;
    getAllComments(res: any): Promise<any>;
    getCommentsByBlog(id: String, res: any, CommentDto: CommentDto): Promise<any>;
    nbrComments(id: String): Promise<Comment>;
    updateComment(id: String, res: any, CommentDto: CommentDto): Promise<any>;
    deleteComment(id: String, res: any): Promise<any>;
}
