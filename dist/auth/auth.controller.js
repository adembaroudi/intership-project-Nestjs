"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const path = require("path");
const auth_service_1 = require("./auth.service");
const admin_dto_1 = require("./Dto/admin.dto");
const companyRegDto_dto_1 = require("./Dto/companyRegDto.dto");
const forget_dto_1 = require("./Dto/forget.dto");
const loginAdmin_dto_1 = require("./Dto/loginAdmin.dto");
const resetpassword_dto_1 = require("./Dto/resetpassword.dto");
const serviceRegistration_dto_1 = require("./Dto/serviceRegistration.dto");
const trainingregistration_dto_1 = require("./Dto/trainingregistration.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async trainingReg(res, trainingReg, idtraining) {
        const training = await this.authService.trainingReg(trainingReg, idtraining);
        if (training === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email in use",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "Register succes",
            training: training,
        });
    }
    async trainingRegwithoutAffectation(res, trainingReg) {
        const training = await this.authService.trainingRegWithoutAffectation(trainingReg);
        if (training === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email in use",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "Register succes",
            training: training,
        });
    }
    async serviceRegistration(res, serviceReg) {
        const service = await this.authService.serviceReg(serviceReg);
        if (service === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email in use",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "Register succes",
            service: service,
        });
    }
    async companyRegistration(res, companyReg) {
        const company = await this.authService.companyReg(companyReg);
        if (company === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email in use",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "Register succes",
            company: company,
        });
    }
    async showAllRegistrations() {
        const all = await this.authService.getAllRgistrations();
        return all;
    }
    async uploadLogoCompany(res, file, idservicereg) {
        if (path.extname(`${file.filename}`) === ".pdf") {
            this.authService.pdfFile(`${file.filename}`, idservicereg);
            await res.json(file.path);
        }
        else {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "not an PDF",
            });
        }
    }
    async downloadPdf(res) {
        const Name = 'Adem.pdf';
        res.download("c:\\upload\\" + Name);
    }
    async getFiles(idservicereg, res) {
        const getpdf = await this.authService.getpdf(idservicereg);
        return res.sendFile(getpdf, { root: "upload" });
    }
    async registerAdmin(res, adminDto) {
        const admin = await this.authService.registerAdmin(adminDto);
        if (admin === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email in use",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "Register succes",
            admin: admin,
        });
    }
    async loginAdmin(res, logindto) {
        const admin = await this.authService.loginAdmin(logindto);
        if (admin === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email or password incorrecte",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "admin logged in successfully",
            admin: admin,
        });
    }
    async sendEmailForgotPassword(forgetdto, res) {
        var isEmailSent = await this.authService.forgetpassword(forgetdto);
        if (isEmailSent === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "error",
            });
        }
        else {
            return res.status(common_1.HttpStatus.OK).json({
                message: "succes",
                mail: isEmailSent,
            });
        }
    }
    async resetpassword(id, resetpassworddto, res) {
        const admin = await this.authService.resetpassword(id, resetpassworddto);
        if (admin === null) {
            res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "not found",
            });
        }
        else {
            return res.status(common_1.HttpStatus.OK).json({
                message: "success",
                admin: admin,
            });
        }
    }
};
__decorate([
    common_1.Post("/trainingregister/:idtraining"),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param("idtraining")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, trainingregistration_dto_1.trainingRegistrationDto,
        String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "trainingReg", null);
__decorate([
    common_1.Post("/trainingregister"),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, trainingregistration_dto_1.trainingRegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "trainingRegwithoutAffectation", null);
__decorate([
    common_1.Post("/serviceRegistration"),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, serviceRegistration_dto_1.serviceRegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "serviceRegistration", null);
__decorate([
    common_1.Post("/companyRegistration"),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, companyRegDto_dto_1.companyRegDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "companyRegistration", null);
__decorate([
    common_1.Get("/ServiceRegistration"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "showAllRegistrations", null);
__decorate([
    common_1.UseInterceptors(platform_express_1.FileInterceptor("pdf", {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "upload/");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() +
                    file.originalname.slice(file.originalname.lastIndexOf(".")));
            },
        }),
    })),
    common_1.Put("/file/:idservicereg"),
    __param(0, common_1.Res()),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Param("idservicereg")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadLogoCompany", null);
__decorate([
    common_1.Get("download"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "downloadPdf", null);
__decorate([
    common_1.Get("getpdf/:idservicereg"),
    __param(0, common_1.Param("idservicereg")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getFiles", null);
__decorate([
    common_1.Post("/admin"),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.registerAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    common_1.Post("/login"),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, loginAdmin_dto_1.LogintDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    common_1.Get("/forgot-password"),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_dto_1.ForgetDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailForgotPassword", null);
__decorate([
    common_1.Put("/reset/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resetpassword_dto_1.ResetpasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetpassword", null);
AuthController = __decorate([
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map