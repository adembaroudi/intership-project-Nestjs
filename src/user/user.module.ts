import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { usersSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { userService } from "./user.service";

@Module({
    imports:[
    MongooseModule.forFeature([{name:"user", schema: usersSchema}]),
MulterModule.register({
    dest:"upload/"
})],
    controllers:[UserController],
    providers:[userService],
})
export class UserModule {
    
}