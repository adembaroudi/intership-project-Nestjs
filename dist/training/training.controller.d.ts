import { TrainingDto } from "./dto/training.dto";
import { trainingService } from "./training.service";
export declare class trainingController {
    private trainService;
    constructor(trainService: trainingService);
    addtraining(id: String, res: any, trainDto: TrainingDto): Promise<any>;
    getAlltrainings(): Promise<import("./training.model").Training>;
    getbyId(id: String): Promise<import("./training.model").Training>;
    updateTraining(id: String, res: any, trainDto: TrainingDto): Promise<any>;
    deletetraining(id: String, res: any): Promise<any>;
}
