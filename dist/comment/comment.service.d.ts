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
    getCommentByBlog(id: String, CommentDto: CommentDto): Promise<Comment>;
    nbrComments(id: String): Promise<Comment>;
    updateComment(id: String, CommentDto: CommentDto): Promise<Comment>;
    deleteComment(id: String): Promise<{
        message: string;
    }>;
}
