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
exports.userService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let userService = class userService {
    constructor(userModel) {
        this.userModel = userModel;
        this.user = [];
    }
    async addUser(userDto) {
        const user = await this.userModel.findOne({ email: userDto.email });
        if (user) {
            return null;
        }
        const salt = 10;
        userDto.password = await bcrypt.hash(userDto.password, salt);
        const newUser = await new this.userModel(userDto);
        return newUser.save();
    }
    async getAllUsers() {
        const allUsers = await this.userModel.find();
        return allUsers;
    }
    async getUserById(id) {
        const userId = await this.userModel.findById(id);
        return userId;
    }
    async deleteUser(id) {
        const userToDelete = await this.userModel.findByIdAndDelete(id);
        return userToDelete;
    }
    async logoUserPic(file, id) {
        return await this.userModel.findOneAndUpdate({ _id: id }, { $set: { logo: file } }).exec();
    }
};
userService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("user")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], userService);
exports.userService = userService;
//# sourceMappingURL=user.service.js.map