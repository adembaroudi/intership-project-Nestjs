import { Model } from "mongoose";
import { Blog } from "./comment.model";
import { CommentDto } from "./dto/comment.dto";
export declare class CommentService {
    private readonly commentModel;
    private readonly blogModel;
    private comment;
    private blog;
    constructor(commentModel: Model<Comment>, blogModel: Model<Blog>);
    newComment(id: String, CommentDto: CommentDto): Promise<Comment>;
    getAllComments(): Promise<Comment>;
    getCommentByBlog(id: String): Promise<any>;
    getCommentById(id: String): Promise<any>;
    nbrComments(id: String): Promise<Comment>;
    updateComment(idcomment: String, CommentDto: CommentDto): Promise<Comment>;
    deleteComment(id: String): Promise<{
        message: string;
    }>;
}
