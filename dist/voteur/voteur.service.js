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
exports.voteurService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const training_model_1 = require("../training/training.model");
const mongoose_2 = require("mongoose");
const jwt = require("jsonwebtoken");
const jwt_1 = require("@nestjs/jwt");
let voteurService = class voteurService {
    constructor(voteurModel, trainModel, jwtService) {
        this.voteurModel = voteurModel;
        this.trainModel = trainModel;
        this.jwtService = jwtService;
        this.voteur = [];
        this.Training = [];
    }
    async registerForVote(voteurDto) {
        const vote = await this.voteurModel.findOne({ email: voteurDto.email });
        console.log(vote);
        if (vote) {
            const token = jwt.sign({ data: vote }, "secret");
            console.log(token);
            return ["logged", token];
        }
        else {
            const voteur = await this.voteurModel.create(voteurDto);
            const token = jwt.sign({ data: voteur }, "secret");
            console.log(token);
            return [token, voteur];
        }
    }
    async loginForVote(tokenDto) {
        const voteur = await this.voteurModel.findOne({ email: tokenDto.email });
        if (!voteur) {
            return null;
        }
        else {
            if (voteur) {
                const token = jwt.sign({ data: voteur }, "secret");
                console.log(token);
                return token;
            }
            else {
            }
            return null;
        }
    }
    async vote(id, idvot) {
        const training = await this.trainModel.findOne({ _id: id });
        const verif = training.voteur.find((user) => user == idvot);
        if (verif) {
            return null;
        }
        else {
            training.nblike += 1;
            const train = await this.trainModel.findByIdAndUpdate(id, {
                $push: { voteur: idvot },
                nblike: training.nblike,
            }, {
                new: true,
            });
            const voteur = await this.voteurModel.findByIdAndUpdate(idvot, {
                $push: { trainings: id }
            }, { new: true });
            return [train, voteur];
        }
    }
    async getAllvoteurs() {
        const getall = await this.voteurModel.find();
        return getall;
    }
    async getVoeurById(id) {
        const votById = await this.voteurModel.findById(id);
        return votById;
    }
    createJwtPayload(voteur) {
        let data = {
            email: voteur.email,
            _id: voteur._id,
        };
        let jwt = this.jwtService.sign(data);
        return jwt;
    }
    async validateUserByJwt(payload) {
        let voteur = await this.voteurModel.findOne({ email: payload.email });
        if (voteur) {
            return this.createJwtPayload(voteur);
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
voteurService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("voteur")),
    __param(1, mongoose_1.InjectModel("trainings")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, jwt_1.JwtService])
], voteurService);
exports.voteurService = voteurService;
//# sourceMappingURL=voteur.service.js.map