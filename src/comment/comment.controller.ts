import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { BlogDto } from "src/blog/dto/blog.dto";
import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";

@Controller("comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Put("/Comments/:id")
  async NewComment(
    @Param("id") id: string,
    @Res() res,
    @Body() CommentDto: CommentDto
  ) {
    const addcomment = await this.commentService.newComment(id, CommentDto);
    return res.send(addcomment);
  }
  @Get("/Comments")
  async getAllComments(@Res() res) {
    const comments = await this.commentService.getAllComments();
    return res.send(comments);
  }
  @Get("/Comments/:id")
  async getCommentsByBlog(
    @Param("id") id: String,
    @Res() res,
    @Body() CommentDto: CommentDto
  ) {
    const CommentsByBlog = await this.commentService.getCommentByBlog(
      id,
      CommentDto
    );
    return res.send(CommentsByBlog);
  }
  @Get("/nbrComments/:id")
  async nbrComments(@Param("id") id: String)  {
    const nbrComments = await this.commentService.nbrComments(id);
    return nbrComments
  }
  @Put("/Comments/:id")
  async updateComment(
    @Param("id") id: String,
    @Res() res,
    @Body() CommentDto: CommentDto
  ) {
    const updateComment = await this.commentService.updateComment(
      id,
      CommentDto
    );
    return res.send(updateComment);
  }
  @Delete("/Comments/:id")
  async deleteComment(@Param("id") id: String, @Res() res) {
   await this.commentService.deleteComment(id);
    return res.status(HttpStatus.OK).json({
      message: "comment deleted successuly",

    });
  }
}
