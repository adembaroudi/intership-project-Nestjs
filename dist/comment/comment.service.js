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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_dto_1 = require("../blog/dto/blog.dto");
let CommentService = class CommentService {
    constructor(commentModel, blogModel) {
        this.commentModel = commentModel;
        this.blogModel = blogModel;
        this.comment = [];
        this.blog = [];
    }
    async newComment(id, CommentDto) {
        const comment = await this.commentModel.create(CommentDto);
        const blog = await this.blogModel.findByIdAndUpdate(id, {
            $push: { comment: comment._id },
        }, {
            new: true,
        });
        await this.commentModel.findByIdAndUpdate(comment._id, { blog: blog._id });
        return blog;
    }
    async getAllComments() {
        const allComments = await this.commentModel.find();
        return allComments;
    }
    async getCommentByBlog(id) {
        const commentsByBlog = await this.blogModel.findById(id).populate("comment").exec();
        return commentsByBlog;
    }
    async getCommentById(id) {
        const commentsById = await this.commentModel.findById(id).populate("replies").exec();
        return commentsById;
    }
    async nbrComments(id) {
        const nbrComments = await this.commentModel.countDocuments({ blog: id });
        return nbrComments;
    }
    async updateComment(idcomment, CommentDto) {
        const comment = await this.commentModel.findByIdAndUpdate(idcomment, { contenue: CommentDto.contenue }, { new: true });
        return comment;
    }
    async deleteComment(id) {
        const commentToDelete = await this.commentModel.findByIdAndDelete(id);
        await this.blogModel.findByIdAndUpdate(commentToDelete.blog, { $pull: {
                comment: commentToDelete._id
            }
        });
        return { message: "comment deleted" };
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("comment")),
    __param(1, mongoose_1.InjectModel("blog")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map