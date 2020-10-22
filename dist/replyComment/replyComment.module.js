"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyCommentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("../comment/schemas/comment.schema");
const replyComment_controller_1 = require("./replyComment.controller");
const replyComment_service_1 = require("./replyComment.service");
const replyComment_schema_1 = require("./schemas/replyComment.schema");
let replyCommentModule = class replyCommentModule {
};
replyCommentModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "replaycomments", schema: replyComment_schema_1.replaycommentsSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "comment", schema: comment_schema_1.commentsSchema }])
        ],
        controllers: [replyComment_controller_1.replyCommentController],
        providers: [replyComment_service_1.replyCommentService],
    })
], replyCommentModule);
exports.replyCommentModule = replyCommentModule;
//# sourceMappingURL=replyComment.module.js.map