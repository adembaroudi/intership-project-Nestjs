"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const blog_module_1 = require("./blog/blog.module");
const comment_module_1 = require("./comment/comment.module");
const replyComment_module_1 = require("./replyComment/replyComment.module");
const contact_module_1 = require("./contact/contact.module");
const partenaires_module_1 = require("./partenaires/partenaires.module");
const training_module_1 = require("./training/training.module");
const vote_module_1 = require("./vote/vote.module");
const voteur_module_1 = require("./voteur/voteur.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/fivepoints"),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            blog_module_1.BlogModule,
            comment_module_1.CommentModule,
            replyComment_module_1.replyCommentModule,
            contact_module_1.contactModule,
            partenaires_module_1.partenairesModule,
            training_module_1.trainingModule,
            vote_module_1.voteModule,
            voteur_module_1.voteurModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map