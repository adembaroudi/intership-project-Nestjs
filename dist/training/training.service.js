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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../user/user.model");
let trainingService = class trainingService {
    constructor(trainModel, userModel) {
        this.trainModel = trainModel;
        this.userModel = userModel;
        this.Training = [];
    }
    async addTraining(id, trainingDto) {
        const training = await this.trainModel.create(trainingDto);
        const user = await this.userModel.findByIdAndUpdate(id, {
            $push: { trainings: training._id },
        }, {
            new: true,
        });
        await this.trainModel.findByIdAndUpdate(training._id, { user: user._id });
        return user;
    }
    async getAllTraining() {
        const getAll = await this.trainModel.find().populate("user").exec();
        return getAll;
    }
    async getTrainingById(id) {
        const getById = await this.trainModel.findById(id).populate("user").exec();
        return getById;
    }
    async updateTraining(id, trainingDto) {
        const upTrain = await this.trainModel.findByIdAndUpdate(id, trainingDto, {
            new: true,
        });
        return upTrain;
    }
    async deleteTraining(id) {
        const deleteTrain = await this.trainModel.findByIdAndDelete(id);
        await this.userModel.findByIdAndUpdate(deleteTrain.user, {
            $pull: {
                trainings: deleteTrain._id,
            },
        });
        return { message: "training deleted" };
    }
    async vote(id, objet) {
        const train = await this.trainModel.findById(id);
        if (objet.choice === "like") {
            train.nblike += 1;
        }
        const trainVoted = await this.trainModel.findByIdAndUpdate(train._id, train, { new: true });
        return trainVoted;
    }
    async logoTrainingPic(file, id) {
        return await this.trainModel
            .findByIdAndUpdate({ _id: id }, { $set: { picture: file } })
            .exec();
    }
    async getLogo(id) {
        const train = await this.trainModel.findById(id);
        const getLogo = train.picture;
        return getLogo;
    }
};
trainingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("trainings")),
    __param(1, mongoose_1.InjectModel("user")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], trainingService);
exports.trainingService = trainingService;
//# sourceMappingURL=training.service.js.map