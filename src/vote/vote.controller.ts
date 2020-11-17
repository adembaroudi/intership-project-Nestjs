import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { VoteDto } from "./dto/vote.dto";

import { voteService } from "./vote.service";
@Controller("vote")
export class voteController {
  constructor(private voteService: voteService) {}


}
