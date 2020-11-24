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
    async NewComment(idblog, res, CommentDto) {
        const addcomment = await this.commentService.newComment(idblog, CommentDto);
        return res.send(addcomment);
    }
    async getAllComments(res) {
        const comments = await this.commentService.getAllComments();
        return res.send(comments);
    }
    async getCommentsByBlog(idblog) {
        const CommentsByBlog = await this.commentService.getCommentByBlog(idblog);
        return CommentsByBlog;
    }
    async getCommentsById(idcomment) {
        const commentsbyid = await this.commentService.getCommentById(idcomment);
        return commentsbyid;
    }
    async nbrComments(idblog) {
        const nbrComments = await this.commentService.nbrComments(idblog);
        return nbrComments;
    }
    async updateComment(idcomment, res, CommentDto) {
        const updateComment = await this.commentService.updateComment(idcomment, CommentDto);
        return res.send(updateComment);
    }
    async deleteComment(idcomment, res) {
        await this.commentService.deleteComment(idcomment);
        return res.status(common_1.HttpStatus.OK).json({
            message: "comment deleted successuly",
        });
    }
};
__decorate([
    common_1.Put("/Comments/:idblog"),
    __param(0, common_1.Param("idblog")),
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
    common_1.Get("/Comments/:idblog"),
    __param(0, common_1.Param("idblog")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsByBlog", null);
__decorate([
    common_1.Get("/commentsbyid/:idcomment"),
    __param(0, common_1.Param("idcomment")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsById", null);
__decorate([
    common_1.Get("/nbrComments/:idblog"),
    __param(0, common_1.Param("idblog")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "nbrComments", null);
__decorate([
    common_1.Put("/putComments/:idcomment"),
    __param(0, common_1.Param("idcomment")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    common_1.Delete("/Comments/:idcomment"),
    __param(0, common_1.Param("idcomment")), __param(1, common_1.Res()),
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