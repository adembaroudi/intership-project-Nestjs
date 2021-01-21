import { AuthService } from "./auth.service";
import { registerAdminDto } from "./Dto/admin.dto";
import { companyRegDto } from "./Dto/companyRegDto.dto";
import { LogintDto } from "./Dto/loginAdmin.dto";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    trainingReg(res: any, trainingReg: trainingRegistrationDto, idtraining?: String): Promise<any>;
    trainingRegwithoutAffectation(res: any, trainingReg: trainingRegistrationDto): Promise<any>;
    serviceRegistration(res: any, serviceReg: serviceRegistrationDto): Promise<any>;
    companyRegistration(res: any, companyReg: companyRegDto): Promise<any>;
    showAllRegistrations(): Promise<any>;
    uploadLogoCompany(res: any, file: any, idservicereg: any): Promise<any>;
    downloadPdf(res: any): Promise<void>;
    getFiles(idservicereg: String, res: any): Promise<any>;
    registerAdmin(res: any, adminDto: registerAdminDto): Promise<any>;
    loginAdmin(res: any, logindto: LogintDto): Promise<any>;
}
