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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const blog_dto_1 = require("../blog/dto/blog.dto");
const comment_service_1 = require("./comment.service");
const comment_dto_1 = require("./dto/comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async NewComment(id, res, CommentDto) {
        const addcomment = await this.commentService.newComment(id, CommentDto);
        return res.send(addcomment);
    }
    async getAllComments(res) {
        const comments = await this.commentService.getAllComments();
        return res.send(comments);
    }
    async getCommentsByBlog(id) {
        const CommentsByBlog = await this.commentService.getCommentByBlog(id);
        return CommentsByBlog;
    }
    async nbrComments(id) {
        const nbrComments = await this.commentService.nbrComments(id);
        return nbrComments;
    }
    async updateComment(id, res, CommentDto) {
        const updateComment = await this.commentService.updateComment(id, CommentDto);
        return res.send(updateComment);
    }
    async deleteComment(id, res) {
        await this.commentService.deleteComment(id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "comment deleted successuly",
        });
    }
};
__decorate([
    common_1.Put("/Comments/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "NewComment", null);
__decorate([
    common_1.Get("/Comments"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAllComments", null);
__decorate([
    common_1.Get("/Comments/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsByBlog", null);
__decorate([
    common_1.Get("/nbrComments/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "nbrComments", null);
__decorate([
    common_1.Put("/putComments/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    common_1.Delete("/Comments/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
CommentController = __decorate([
    common_1.Controller("comment"),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map