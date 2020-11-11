import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { usersSchema } from "src/user/schemas/user.schema";
import { trainingsSchema } from "./schemas/training.schema";
import { trainingController } from "./training.controller";
import { trainingService } from "./training.service";

@Module({
    imports:[MongooseModule.forFeature([{name:"trainings", schema:trainingsSchema}]),
    MongooseModule.forFeature([{name:"user", schema:usersSchema}])
],
    controllers:[trainingController],
    providers:[trainingService],

})
export class trainingModule{

}