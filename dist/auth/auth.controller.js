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
const serviceRegistration_dto_1 = require("./Dto/serviceRegistration.dto");
const trainingregistration_dto_1 = require("./Dto/trainingregistration.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async trainingReg(idtraining, res, trainingReg) {
        const training = await this.authService.trainingReg(idtraining, trainingReg);
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
};
__decorate([
    common_1.Post("/trainingregister/:idtraining"),
    __param(0, common_1.Param("idtraining")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, trainingregistration_dto_1.trainingRegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "trainingReg", null);
__decorate([
    common_1.Post("/ServiceRegistration"),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, serviceRegistration_dto_1.serviceRegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "serviceRegistration", null);
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
AuthController = __decorate([
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map