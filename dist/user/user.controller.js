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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../user/dto/user.dto");
const user_service_1 = require("../user/user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async addUser(res, userDto) {
        const user = await this.userService.addUser(userDto);
        if (user === null) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "email in use",
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: "user added successuly",
            user: user,
        });
    }
    async getUserById(id, res) {
        const userId = await this.userService.getUserById(id);
        return res.send(userId);
    }
    async deleteUser(id, res) {
        const userToDelete = await this.userService.deleteUser(id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "user deleted successuly",
            user: userToDelete,
        });
    }
};
__decorate([
    common_1.Post("/Users"),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    common_1.Get("/Users/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    common_1.Delete("/Users/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    common_1.Controller("user"),
    __metadata("design:paramtypes", [user_service_1.userService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map