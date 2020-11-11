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
exports.trainingController = void 0;
const common_1 = require("@nestjs/common");
const training_dto_1 = require("./dto/training.dto");
const training_service_1 = require("./training.service");
const multer = require("multer");
const path = require("path");
const platform_express_1 = require("@nestjs/platform-express");
let trainingController = class trainingController {
    constructor(trainService) {
        this.trainService = trainService;
    }
    async addtraining(id, res, trainDto) {
        const training = await this.trainService.addTraining(id, trainDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "training added successuly",
            training: training,
        });
    }
    async getAlltrainings() {
        const getAll = await this.trainService.getAllTraining();
        return getAll;
    }
    async getbyId(id) {
        const getId = await this.trainService.getTrainingById(id);
        return getId;
    }
    async updateTraining(id, res, trainDto) {
        const uptrain = await this.trainService.updateTraining(id, trainDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "training updated successuly",
            training: uptrain,
        });
    }
    async deletetraining(id, res) {
        await this.trainService.deleteTraining(id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "training deletetd successuly",
        });
    }
    async vote(id, object) {
        const train = await this.trainService.vote(id, object);
        return train;
    }
    async uploadLogoCompany(res, file, id) {
        if (path.extname(`${file.filename}`) === ".png" ||
            path.extname(`${file.filename}`) === ".jpg" ||
            path.extname(`${file.filename}`) === ".JPG" ||
            path.extname(`${file.filename}`) === ".jpeg") {
            this.trainService.logoTrainingPic(`${file.filename}`, id);
            await res.json(file.path);
        }
        return { message: "not an Image" };
    }
    async getFiles(id, res) {
        const getlogo = await this.trainService.getLogo(id);
        return res.sendFile(getlogo, { root: "upload" });
    }
};
__decorate([
    common_1.Post("Trainings/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, training_dto_1.TrainingDto]),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "addtraining", null);
__decorate([
    common_1.Get("/Trainings"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "getAlltrainings", null);
__decorate([
    common_1.Get("/Trainings/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "getbyId", null);
__decorate([
    common_1.Put("/Trainings/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, training_dto_1.TrainingDto]),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "updateTraining", null);
__decorate([
    common_1.Delete("/Trainings/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "deletetraining", null);
__decorate([
    common_1.Put("/voteTrainings/:id"),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "vote", null);
__decorate([
    common_1.UseInterceptors(platform_express_1.FileInterceptor("image", {
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
    common_1.Put("/Trainings/file/:id"),
    __param(0, common_1.Res()),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "uploadLogoCompany", null);
__decorate([
    common_1.Get("getTrainingLogo/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], trainingController.prototype, "getFiles", null);
trainingController = __decorate([
    common_1.Controller("training"),
    __metadata("design:paramtypes", [training_service_1.trainingService])
], trainingController);
exports.trainingController = trainingController;
//# sourceMappingURL=training.controller.js.map