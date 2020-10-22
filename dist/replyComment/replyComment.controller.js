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
exports.replyCommentController = void 0;
const common_1 = require("@nestjs/common");
const replyComment_dto_1 = require("./dto/replyComment.dto");
const replyComment_service_1 = require("./replyComment.service");
let replyCommentController = class replyCommentController {
    constructor(replyService) {
        this.replyService = replyService;
    }
    async NewComment(id, replyDto) {
        const addcomment = await this.replyService.repComment(id, replyDto);
        return addcomment;
    }
    async getReplyByComment(id, replyDto) {
        const replies = await this.replyService.getReplyByComment(id, replyDto);
        return replies;
    }
};
__decorate([
    common_1.Put("/repcomment/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, replyComment_dto_1.replyCommentDto]),
    __metadata("design:returntype", Promise)
], replyCommentController.prototype, "NewComment", null);
__decorate([
    common_1.Get("/getrepliesByComment/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        replyComment_dto_1.replyCommentDto]),
    __metadata("design:returntype", Promise)
], replyCommentController.prototype, "getReplyByComment", null);
replyCommentController = __decorate([
    common_1.Controller("replycomment"),
    __metadata("design:paramtypes", [replyComment_service_1.replyCommentService])
], replyCommentController);
exports.replyCommentController = replyCommentController;
//# sourceMappingURL=replyComment.controller.js.map