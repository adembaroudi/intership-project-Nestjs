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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.partenairesServices = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let partenairesServices = class partenairesServices {
    constructor(partenairesModel) {
        this.partenairesModel = partenairesModel;
        this.partenaires = [];
    }
    async addPartenaire(partenairesDto) {
        const partenaire = await this.partenairesModel.create(partenairesDto);
        return partenaire;
    }
    async getAllPartenaires() {
        const getAll = await this.partenairesModel.find();
        return getAll;
    }
    async getPartenaireById(id) {
        const getId = await this.partenairesModel.findById(id);
        return getId;
    }
    async updatePartenaire(id, partenairesDto) {
        const updatePartenaire = await this.partenairesModel.findByIdAndUpdate(id, partenairesDto);
        return updatePartenaire;
    }
    async deletePartenaire(id) {
        const partToDelete = await this.partenairesModel.findByIdAndDelete(id);
        return partToDelete;
    }
    async logoPartenaire(file, id) {
        return await this.partenairesModel.findOneAndUpdate({ _id: id }, { $set: { Logo: file } }).exec();
    }
    async getLogo(id) {
        const Partenaire = await this.partenairesModel.findById(id);
        const getLogo = Partenaire.Logo;
        return getLogo;
    }
};
partenairesServices = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('partenaires')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], partenairesServices);
exports.partenairesServices = partenairesServices;
//# sourceMappingURL=partenaires.service.js.map