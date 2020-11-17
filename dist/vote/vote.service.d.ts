import { Model } from "mongoose";
import { Training } from "src/training/training.model";
import { Vote } from "./vote.model";
export declare class voteService {
    private readonly voteModel;
    private readonly trainModel;
    private vote;
    private Training;
    constructor(voteModel: Model<Vote>, trainModel: Model<Training>);
}
