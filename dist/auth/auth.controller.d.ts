import { AuthService } from "./auth.service";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    trainingReg(idtraining: String, res: any, trainingReg: trainingRegistrationDto): Promise<any>;
    serviceRegistration(res: any, serviceReg: serviceRegistrationDto): Promise<any>;
    showAllRegistrations(): Promise<import("./auth.model").service>;
}
