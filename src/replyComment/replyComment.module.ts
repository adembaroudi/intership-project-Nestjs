import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { commentsSchema } from "src/comment/schemas/comment.schema";
import {  replyCommentController } from "./replyComment.controller";
import {  replyCommentService } from "./replyComment.service";
import { replaycommentsSchema } from "./schemas/replyComment.schema";



@Module({
    imports:[

MongooseModule.forFeature([{name:"replies",schema:replaycommentsSchema}]),
MongooseModule.forFeature([{name:"comment",schema:commentsSchema}])],
    controllers:[replyCommentController],
    providers:[replyCommentService],
})
export class replyCommentModule {
    
}