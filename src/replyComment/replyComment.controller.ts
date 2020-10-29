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
    
  @Put("/repcomment/:id")
  async NewComment(
    @Param("id") id: string,
    @Body() replyDto: replyCommentDto
  ) {
    const addcomment = await this.replyService.repComment(id, replyDto);
    return addcomment;
  }
  @Get("/getrepliesByComment/:id")
  async getReplyByComment(
    @Param("id") id: String,
  
  ) {
    const replies = await this.replyService.getReplyByComment(
      id,
  
    );
    return replies
  }
  @Get("/nbrReplies/:id")
  async nbrComments(@Param("id") id: String)  {
    const nbrReplies = await this.replyService.nbrReplies(id);
    return nbrReplies;
  }
  
  }
  