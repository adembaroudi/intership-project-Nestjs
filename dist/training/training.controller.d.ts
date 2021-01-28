import { TrainingDto } from "./dto/training.dto";
import { trainingService } from "./training.service";
export declare class trainingController {
    private trainService;
    constructor(trainService: trainingService);
    addtraining(iduser: String, res: any, trainDto: TrainingDto): Promise<any>;
    getAlltrainings(): Promise<import("./training.model").Training>;
    getbyId(idtraining: String): Promise<import("./training.model").Training>;
    introDesc(idtraining: String): Promise<any>;
    updateTraining(idtraining: String, iduser: String, res: any, trainDto: TrainingDto): Promise<any>;
    deletetraining(idtraining: String, res: any): Promise<any>;
    uploadLogoCompany(res: any, file: any, id: any): Promise<any>;
    getFiles(id: String, res: any): Promise<any>;
}
