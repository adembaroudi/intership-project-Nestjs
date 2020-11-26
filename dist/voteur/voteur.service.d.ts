import { Training } from "src/training/training.model";
import { Model } from "mongoose";
import { Voteur } from "./voteur.model";
import { VoteurDto } from "./dto/voteur.dto";
import { TokenDto } from "./dto/token.dto";
import { JwtPayload } from "./interface/jwt-payload.interface";
import { JwtService } from '@nestjs/jwt';
export declare class voteurService {
    private readonly voteurModel;
    private readonly trainModel;
    private jwtService;
    private voteur;
    private Training;
    constructor(voteurModel: Model<Voteur>, trainModel: Model<Training>, jwtService: JwtService);
    registerForVote(voteurDto: VoteurDto): Promise<any>;
    loginForVote(tokenDto: TokenDto): Promise<string>;
    vote(id: String, idvot: String): Promise<any>;
    getAllvoteurs(): Promise<Voteur>;
    getVoeurById(id: String): Promise<Voteur>;
    createJwtPayload(voteur: any): string;
    validateUserByJwt(payload: JwtPayload): Promise<string>;
}
