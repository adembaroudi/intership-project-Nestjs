import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogModule } from "src/blog/blog.module";
import { blogsSchema } from "src/blog/schemas/blog.schema";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { commentsSchema } from "./schemas/comment.schema";


@Module({
    imports:[
    MongooseModule.forFeature([{name:"comment", schema: commentsSchema}]),
MongooseModule.forFeature([{name:"blog",schema:blogsSchema}])],
    controllers:[CommentController],
    providers:[CommentService],
})
export class CommentModule {
    
}