import { Training } from "src/training/training.model";
import { Vote } from "src/vote/vote.model";
import { Model } from "mongoose";
import { Voteur } from "./voteur.model";
import { VoteurDto } from "./dto/voteur.dto";
import { TokenDto } from "./dto/token.dto";
export declare class voteurService {
    private readonly voteurModel;
    private readonly voteModel;
    private readonly trainModel;
    private voteur;
    private Training;
    constructor(voteurModel: Model<Voteur>, voteModel: Model<Vote>, trainModel: Model<Training>);
    registerForVote(voteurDto: VoteurDto): Promise<Voteur>;
    loginForVote(tokenDto: TokenDto): Promise<string>;
    vote(id: String, idvot: String): Promise<any>;
    getAllvoteurs(): Promise<Voteur>;
    getVoeurById(id: String): Promise<Voteur>;
}
