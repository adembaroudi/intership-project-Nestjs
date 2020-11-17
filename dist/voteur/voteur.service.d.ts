import { Training } from "src/training/training.model";
import { Model } from "mongoose";
import { Voteur } from "./voteur.model";
import { VoteurDto } from "./dto/voteur.dto";
import { TokenDto } from "./dto/token.dto";
export declare class voteurService {
    private readonly voteurModel;
    private readonly trainModel;
    private voteur;
    private Training;
    constructor(voteurModel: Model<Voteur>, trainModel: Model<Training>);
    registerForVote(voteurDto: VoteurDto): Promise<Voteur>;
    loginForVote(tokenDto: TokenDto): Promise<string>;
    vote(id: String, idvot: String): Promise<any>;
    getAllvoteurs(): Promise<Voteur>;
    getVoeurById(id: String): Promise<Voteur>;
}
