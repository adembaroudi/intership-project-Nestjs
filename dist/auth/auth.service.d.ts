import { service } from "./auth.model";
import { Model } from "mongoose";
import { trainingReg } from "./interfaces/trainingreg.interace";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { Training } from "src/training/training.model";
export declare class AuthService {
    private readonly trainingModel;
    private readonly serviceRegmodel;
    private readonly trainModel;
    private training;
    private serviceRegistration;
    constructor(trainingModel: Model<trainingReg>, serviceRegmodel: Model<service>, trainModel: Model<Training>);
    trainingReg(id: String, trainingRegDto: trainingRegistrationDto): Promise<any>;
    serviceReg(serviceRegDto: serviceRegistrationDto): Promise<any>;
    getAllRgistrations(): Promise<service>;
}
