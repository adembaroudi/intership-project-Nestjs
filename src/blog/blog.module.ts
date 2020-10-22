import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { blogController } from "./blog.controller";
import { blogService } from "./blog.service";
import { blogsSchema } from "./schemas/blog.schema";


@Module({
    imports:[
    MongooseModule.forFeature([{name:"blog", schema: blogsSchema}])],
    controllers:[blogController],
    providers:[blogService],
})
export class BlogModule {
    
}