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
exports.partenairesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const path = require("path");
const partenaires_dto_1 = require("./dto/partenaires.dto");
const partenaires_service_1 = require("./partenaires.service");
let partenairesController = class partenairesController {
    constructor(partService) {
        this.partService = partService;
    }
    async addPartenaire(partDto, res) {
        const addPartenaire = await this.partService.addPartenaire(partDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "partenaire added successuly",
            added: addPartenaire,
        });
    }
    async getAllPartenaires() {
        const getAll = await this.partService.getAllPartenaires();
        return getAll;
    }
    async getPartenaire(id) {
        const getOne = await this.partService.getPartenaireById(id);
        return getOne;
    }
    async updatepartenaire(id, res, partDto) {
        const upOne = await this.partService.updatePartenaire(id, partDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "partenaire updated successfully",
            part: upOne,
        });
    }
    async deletePartenaire(id, res) {
        const deleteOne = await this.partService.deletePartenaire(id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "partenaire deleted successfully",
        });
    }
    async uploadLogoPartenaire(res, file, id) {
        if (path.extname(`${file.filename}`) === ".png" ||
            path.extname(`${file.filename}`) === ".jpg" ||
            path.extname(`${file.filename}`) === ".JPG" ||
            path.extname(`${file.filename}`) === ".jpeg") {
            this.partService.logoPartenaire(`${file.filename}`, id);
            await res.json(file);
        }
        return { message: "not an Image" };
    }
    async getFiles(id, res) {
        const getLogo = await this.partService.getLogo(id);
        return res.sendFile(getLogo, { root: "upload" });
    }
};
__decorate([
    common_1.Post("addPartenaire"),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [partenaires_dto_1.PartenairesDto, Object]),
    __metadata("design:returntype", Promise)
], partenairesController.prototype, "addPartenaire", null);
__decorate([
    common_1.Get("getall"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], partenairesController.prototype, "getAllPartenaires", null);
__decorate([
    common_1.Get("getPartenaire/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], partenairesController.prototype, "getPartenaire", null);
__decorate([
    common_1.Put("updatepartenaire/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, partenaires_dto_1.PartenairesDto]),
    __metadata("design:returntype", Promise)
], partenairesController.prototype, "updatepartenaire", null);
__decorate([
    common_1.Delete("deleteone/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], partenairesController.prototype, "deletePartenaire", null);
__decorate([
    common_1.UseInterceptors(platform_express_1.FileInterceptor("file", {
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
    common_1.Put("file/:id"),
    __param(0, common_1.Res()),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], partenairesController.prototype, "uploadLogoPartenaire", null);
__decorate([
    common_1.Get("getPartenaireLogo/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], partenairesController.prototype, "getFiles", null);
partenairesController = __decorate([
    common_1.Controller("partenaires"),
    __metadata("design:paramtypes", [partenaires_service_1.partenairesServices])
], partenairesController);
exports.partenairesController = partenairesController;
//# sourceMappingURL=partenaires.controller.js.map