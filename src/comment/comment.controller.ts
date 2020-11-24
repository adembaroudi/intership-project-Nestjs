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

  @Put("/Comments/:idblog")
  async NewComment(
    @Param("idblog") idblog: string,
    @Res() res,
    @Body() CommentDto: CommentDto
  ) {
    const addcomment = await this.commentService.newComment(idblog, CommentDto);
    return res.send(addcomment);
  }
  @Get("/Comments")
  async getAllComments(@Res() res) {
    const comments = await this.commentService.getAllComments();
    return res.send(comments);
  }
  @Get("/Comments/:idblog")
  async getCommentsByBlog(
    @Param("idblog") idblog: String ) {
    const CommentsByBlog = await this.commentService.getCommentByBlog(idblog);
    return CommentsByBlog
  }
  @Get("/commentsbyid/:idcomment")
  async getCommentsById(
    @Param("idcomment") idcomment: String ) {
    const commentsbyid = await this.commentService.getCommentById(idcomment);
    return commentsbyid
  }
  @Get("/nbrComments/:idblog")
  async nbrComments(@Param("idblog") idblog: String)  {
    const nbrComments = await this.commentService.nbrComments(idblog);
    return nbrComments
  }
  @Put("/putComments/:idcomment")
  async updateComment(
    @Param("idcomment") idcomment: String,
    @Res() res,
    @Body() CommentDto: CommentDto
  ) {
    const updateComment = await this.commentService.updateComment(
      idcomment,
      CommentDto 
    );
    return res.send(updateComment);
  }
  @Delete("/Comments/:idcomment")
  async deleteComment(@Param("idcomment") idcomment: String, @Res() res) {
   await this.commentService.deleteComment(idcomment);
    return res.status(HttpStatus.OK).json({
      message: "comment deleted successuly",
    });
  }
}
