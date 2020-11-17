import { TrainingDto } from "./dto/training.dto";
import { trainingService } from "./training.service";
export declare class trainingController {
    private trainService;
    constructor(trainService: trainingService);
    addtraining(id: String, res: any, trainDto: TrainingDto): Promise<any>;
    getAlltrainings(): Promise<import("./training.model").Training>;
    getbyId(id: String): Promise<import("./training.model").Training>;
    introDesc(id: String): Promise<any>;
    updateTraining(id: String, res: any, trainDto: TrainingDto): Promise<any>;
    deletetraining(id: String, res: any): Promise<any>;
    vote(id: String, object: any): Promise<import("./training.model").Training>;
    uploadLogoCompany(res: any, file: any, id: any): Promise<any>;
    getFiles(id: String, res: any): Promise<any>;
}
