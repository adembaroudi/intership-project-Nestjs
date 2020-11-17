import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BlogModule } from "./blog/blog.module";
import { CommentModule } from "./comment/comment.module";
import { replyCommentModule } from "./replyComment/replyComment.module";
import { contactModule } from "./contact/contact.module";
import { partenairesModule } from "./partenaires/partenaires.module";
import { trainingModule } from "./training/training.module";
import { MulterModule } from "@nestjs/platform-express";
import { voteModule } from "./vote/vote.module";
import { voteurModule } from "./voteur/voteur.module";
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/fivepoints"),
   
    AuthModule,
    UserModule,
    BlogModule,
    CommentModule,
    replyCommentModule,
    contactModule,
    partenairesModule,
    trainingModule,
    voteModule,
    voteurModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
