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
exports.replyCommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let replyCommentService = class replyCommentService {
    constructor(commentModel, replyModel) {
        this.commentModel = commentModel;
        this.replyModel = replyModel;
        this.comment = [];
        this.replyComment = [];
    }
    async repComment(id, replyDto) {
        const repcomment = await this.replyModel.create(replyDto);
        const comment = await this.commentModel.findByIdAndUpdate(id, {
            $push: { replies: repcomment._id },
        }, {
            new: true,
        });
        await this.replyModel.findByIdAndUpdate(repcomment._id, {
            comment: comment._id,
        });
        return comment;
    }
    async getReplyByComment(id) {
        const getReplyByComment = await this.commentModel.findById(id).populate("replies").exec();
        return getReplyByComment;
    }
    async nbrReplies(id) {
        const nbrReplies = await this.replyModel.countDocuments({ comment: id });
        return nbrReplies;
    }
    async deleteReplies(id) {
        const repliqueToDelete = await this.replyModel.findByIdAndDelete(id);
        await this.commentModel.findByIdAndUpdate(repliqueToDelete.comment, { $pull: {
                replies: repliqueToDelete._id
            }
        });
        return { message: "reply deleted" };
    }
};
replyCommentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("comment")),
    __param(1, mongoose_1.InjectModel("replies")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], replyCommentService);
exports.replyCommentService = replyCommentService;
//# sourceMappingURL=replyComment.service.js.map