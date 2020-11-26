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
import { TokenDto } from "./dto/token.dto";
import { VoteurDto } from "./dto/voteur.dto";
import { voteurService } from "./voteur.service";

@Controller("voteur")
export class voteurController {
  constructor(private voteurService: voteurService) {}
  @Post("/registerforvote")
  async vote(@Body() voteurDto: VoteurDto, @Res() res) {
    const registerForVote = await this.voteurService.registerForVote(voteurDto);
    if (registerForVote.find((e) => e == "logged")) {
      return res.status(HttpStatus.OK).json({
        message: " you are logged",
        data: registerForVote,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: " you are registred successfully! ",
        data: registerForVote,
      });
    }
  }
  @Post("/loginforvote")
  async sendToken(@Res() res, @Body() tokenDto: TokenDto) {
    const voteur = await this.voteurService.loginForVote(tokenDto);
    if (voteur === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "email or password incorrecte",
      });
    }
    return res.status(HttpStatus.OK).json({
      message: "patient logged in successfully",
      voteur: voteur,
    });
  } 
  @Put("/vote/:id/:idvot")
  async voteTrain(
    @Param("id") id: String,
    @Param("idvot") idvot: String,
    @Res() res
  ) {
    const vote = await this.voteurService.vote(id, idvot);
    if (vote === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "you have already voted",
        vote: vote,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: "voted successfully",
        vote: vote,
      });
    }
  }
  @Get("/Voteurs")
  async getAlltrainings() {
    const getAll = await this.voteurService.getAllvoteurs();
    return getAll;
  }
  @Get("/Voteurs/:id")
  async getbyId(@Param("id") id: String) {
    const getId = await this.voteurService.getVoeurById(id);
    return getId;
  }
}
