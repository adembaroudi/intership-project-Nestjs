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
import { replyCommentDto } from "./dto/replyComment.dto";
import { replyCommentService } from "./replyComment.service";

  
  @Controller("replycomment")
  export class replyCommentController {
    constructor( private replyService : replyCommentService) {}
    
  @Put("/repcomment/:idcomment")
  async NewComment(
    @Param("idcomment") idcomment: string,
    @Body() replyDto: replyCommentDto
  ) {
    const addcomment = await this.replyService.repComment(idcomment, replyDto);
    return addcomment;
  }
  @Get("/getrepliesByComment/:idcomment")
  async getReplyByComment(
    @Param("idcomment") idcomment: String) {
    const replies = await this.replyService.getReplyByComment(idcomment);
    return replies
  }
  @Get("/nbrReplies/:idcomment")
  async nbrComments(@Param("id") id: String)  {
    const nbrReplies = await this.replyService.nbrReplies(id);
    return nbrReplies;
  }
  
  }
  