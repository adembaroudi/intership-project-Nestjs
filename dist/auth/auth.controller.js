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
const auth_service_1 = require("./auth.service");
const serviceRegistration_dto_1 = require("./Dto/serviceRegistration.dto");
const trainingregistration_dto_1 = require("./Dto/trainingregistration.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async trainingReg(id, res, trainingReg) {
        const training = await this.authService.trainingReg(id, trainingReg);
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
};
__decorate([
    common_1.Post("/trainingregister/:id"),
    __param(0, common_1.Param('id')),
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
    common_1.Get('/ServiceRegistration'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "showAllRegistrations", null);
AuthController = __decorate([
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map