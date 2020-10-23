import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { blogController } from "./blog.controller";
import { blogService } from "./blog.service";
import { blogsSchema } from "./schemas/blog.schema";
@Module({
    imports:[
    MongooseModule.forFeature([{name:"blog", schema: blogsSchema}]),
    MulterModule.register({
        dest:"upload/",
      }),],
    controllers:[blogController],
    providers:[blogService],
})
export class BlogModule {
    
}