import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    NewComment(idblog: string, res: any, CommentDto: CommentDto): Promise<any>;
    getAllComments(res: any): Promise<any>;
    getCommentsByBlog(idblog: String): Promise<any>;
    getCommentsById(idcomment: String): Promise<any>;
    nbrComments(idblog: String): Promise<Comment>;
    updateComment(idcomment: String, res: any, CommentDto: CommentDto): Promise<any>;
    deleteComment(idcomment: String, res: any): Promise<any>;
}
