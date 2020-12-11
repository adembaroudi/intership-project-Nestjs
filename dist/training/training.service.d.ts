import { Training } from "./training.model";
import { Model } from "mongoose";
import { TrainingDto } from "./dto/training.dto";
import { User } from "src/user/user.model";
export declare class trainingService {
    private readonly trainModel;
    private readonly userModel;
    private Training;
    constructor(trainModel: Model<Training>, userModel: Model<User>);
    addTraining(id: String, trainingDto: TrainingDto): Promise<Training>;
    getAllTraining(): Promise<Training>;
    getTrainingById(id: String): Promise<Training>;
    getIntroDesc(id: String): Promise<any>;
    updateTraining(id: String, trainingDto: TrainingDto): Promise<Training>;
    deleteTraining(id: String): Promise<{
        message: string;
    }>;
    logoTrainingPic(file: any, id: any): Promise<Training>;
    getLogo(id: any): Promise<Training>;
}
