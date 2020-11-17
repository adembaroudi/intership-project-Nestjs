import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Training } from "src/training/training.model";
import { Vote } from "src/vote/vote.model";
import { Model } from "mongoose";
import { Voteur } from "./voteur.model";
import { VoteurDto } from "./dto/voteur.dto";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "./interface/jwt-payload.interface";
import * as bcrypt from "bcryptjs";
import { TokenDto } from "./dto/token.dto";
import { trainingController } from "src/training/training.controller";
import { Console, log } from "console";
@Injectable()
export class voteurService {
  private voteur: Voteur[] = [];
  private Training: Training[] = [];

  constructor(
    @InjectModel("voteur") private readonly voteurModel: Model<Voteur>,
    @InjectModel("votes") private readonly voteModel: Model<Vote>,
    @InjectModel("trainings") private readonly trainModel: Model<Training>
  ) {}
  async registerForVote(voteurDto: VoteurDto): Promise<Voteur> {
    const vote = await this.voteurModel.findOne({ email: voteurDto.email });
    if (vote) {
      return null;
    } else {
      const voteur = await this.voteurModel.create(voteurDto);
      return voteur;
    }
  }
  async loginForVote(tokenDto: TokenDto) {
    const voteur = await this.voteurModel.findOne({ email: tokenDto.email });

    if (!voteur) {
      return null;
    } else {
      if (voteur) {
        const token = jwt.sign({ data: voteur }, "secret");
        console.log(token);
        return token;
      } else {
      }
      return null;
    }
  }

  async vote(id: String, idvot: String): Promise<any> {
    const training = await this.trainModel.findOne({ _id: id });
    const verif = training.voteur.find((user) => user == idvot);
    if (verif) {
      return null;
    } else {
      training.nblike += 1;
      const train = await this.trainModel.findByIdAndUpdate(
        id,
        {
          $push: { voteur: idvot },
          nblike: training.nblike,
        },
        {
          new: true,
        }
      );
      return train;
    }
  }

  async getAllvoteurs(): Promise<Voteur> {
    const getall = await this.voteurModel.find();
    return getall;
  }
  async getVoeurById(id: String): Promise<Voteur> {
    const votById = await this.voteurModel.findById(id);
    return votById;
  }
}
