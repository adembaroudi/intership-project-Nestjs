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
exports.contactController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../user/dto/user.dto");
const contact_service_1 = require("./contact.service");
const contact_dto_1 = require("./dto/contact.dto");
let contactController = class contactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async addMessage(ContactDto, res) {
        const message = await this.contactService.addMessage(ContactDto);
        return res.send(message);
    }
    async getAllmsgs() {
        const getAll = await this.contactService.getAllMsgs();
        return getAll;
    }
    async getMsgById(id) {
        const msgId = await this.contactService.getMsgsById(id);
        return msgId;
    }
    async updateMsg(id, contactDto) {
        const upmsg = await this.contactService.updateMsg(id, contactDto);
        return upmsg;
    }
    async deleteMsg(id, res) {
        const deletemsg = await this.contactService.deleteMsg(id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "user deleted successuly",
        });
    }
};
__decorate([
    common_1.Post("/Contact"),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.ContactDto, Object]),
    __metadata("design:returntype", Promise)
], contactController.prototype, "addMessage", null);
__decorate([
    common_1.Get("/Contact"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], contactController.prototype, "getAllmsgs", null);
__decorate([
    common_1.Get("/Contact/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], contactController.prototype, "getMsgById", null);
__decorate([
    common_1.Put("/Contact/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contact_dto_1.ContactDto]),
    __metadata("design:returntype", Promise)
], contactController.prototype, "updateMsg", null);
__decorate([
    common_1.Delete("/Contact/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], contactController.prototype, "deleteMsg", null);
contactController = __decorate([
    common_1.Controller("contact"),
    __metadata("design:paramtypes", [contact_service_1.contactService])
], contactController);
exports.contactController = contactController;
//# sourceMappingURL=contact.controller.js.map