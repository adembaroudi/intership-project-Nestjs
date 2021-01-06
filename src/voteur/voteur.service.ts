import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Training } from "src/training/training.model";
import { Model } from "mongoose";
import { Voteur } from "./voteur.model";
import { VoteurDto } from "./dto/voteur.dto";
import * as jwt from "jsonwebtoken";
import { TokenDto } from "./dto/token.dto";
import { JwtPayload } from "./interface/jwt-payload.interface";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class voteurService {
  private voteur: Voteur[] = [];
  private Training: Training[] = [];

  constructor(
    @InjectModel("voteur") private readonly voteurModel: Model<Voteur>,
    @InjectModel("trainings") private readonly trainModel: Model<Training>,
    private jwtService: JwtService
  ) {}
  async registerForVote(voteurDto: VoteurDto): Promise<any> {
    const vote = await this.voteurModel.findOne({ email: voteurDto.email }); 
    if (vote) {
      const token = jwt.sign({ data: vote }, "secret");
      console.log(token);
      return ["logged" , token ];
    } else {
      const voteur = await this.voteurModel.create(voteurDto);
      const token = jwt.sign({ data: voteur }, "secret");
      console.log(token);
      return [token , voteur];
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
      const voteur = await this.voteurModel.findByIdAndUpdate(
        idvot,{
        $push:{trainings : id}
        },
        {new  : true}
      )
      return [train , voteur];
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
  createJwtPayload(voteur){

    let data: JwtPayload = {
        email: voteur.email,
        _id: voteur._id,
    };

    let jwt = this.jwtService.sign(data);

    return jwt

}
  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    let voteur = await this.voteurModel.findOne({email:payload.email});


    if(voteur){
        return this.createJwtPayload(voteur);
    } 
     else {
        throw new UnauthorizedException();
    }
    

}
}
