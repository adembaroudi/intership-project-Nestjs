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
exports.voteurController = void 0;
const common_1 = require("@nestjs/common");
const token_dto_1 = require("./dto/token.dto");
const voteur_dto_1 = require("./dto/voteur.dto");
const voteur_service_1 = require("./voteur.service");
let voteurController = class voteurController {
    constructor(voteurService) {
        this.voteurService = voteurService;
    }
    async vote(voteurDto, res) {
        const registerForVote = await this.voteurService.registerForVote(voteurDto);
        if (registerForVote === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: " you are already registred",
            });
        }
        else {
            return res.status(common_1.HttpStatus.OK).json({
                message: " you are registred successfully! ",
                data: registerForVote,
            });
        }
    }
    async sendToken(res, tokenDto) {
        const voteur = await this.voteurService.loginForVote(tokenDto);
        if (voteur === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email or password incorrecte",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "patient logged in successfully",
            voteur: voteur,
        });
    }
    async voteTrain(id, idvot, res) {
        const vote = await this.voteurService.vote(id, idvot);
        if (vote === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "you have already voted",
                vote: vote
            });
        }
        else if (vote !== null) {
            return res.status(common_1.HttpStatus.OK).json({
                message: "voted successfully",
                vote: vote,
            });
        }
        else {
            return res.status(common_1.HttpStatus.OK).json({
                message: "something went wrong"
            });
        }
    }
    async getAlltrainings() {
        const getAll = await this.voteurService.getAllvoteurs();
        return getAll;
    }
    async getbyId(id) {
        const getId = await this.voteurService.getVoeurById(id);
        return getId;
    }
};
__decorate([
    common_1.Post("/registerforvote"),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [voteur_dto_1.VoteurDto, Object]),
    __metadata("design:returntype", Promise)
], voteurController.prototype, "vote", null);
__decorate([
    common_1.Post("/loginforvote"),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, token_dto_1.TokenDto]),
    __metadata("design:returntype", Promise)
], voteurController.prototype, "sendToken", null);
__decorate([
    common_1.Put("/vote/:id/:idvot"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Param("idvot")),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String, Object]),
    __metadata("design:returntype", Promise)
], voteurController.prototype, "voteTrain", null);
__decorate([
    common_1.Get("/Voteurs"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], voteurController.prototype, "getAlltrainings", null);
__decorate([
    common_1.Get("/Voteurs/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], voteurController.prototype, "getbyId", null);
voteurController = __decorate([
    common_1.Controller("voteur"),
    __metadata("design:paramtypes", [voteur_service_1.voteurService])
], voteurController);
exports.voteurController = voteurController;
//# sourceMappingURL=voteur.controller.js.map