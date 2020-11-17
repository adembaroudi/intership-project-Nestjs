import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { trainingsSchema } from "src/training/schemas/training.schema";
import { votesSchema } from "src/vote/schema/vote.schema";
import { voteurSchema } from "./schemas/voteur.schema";
import { voteurController } from "./voteur.controller";
import { voteurService } from "./voteur.service";

@Module({
    imports:[
    MongooseModule.forFeature([{name:"voteur", schema: voteurSchema}]),
    MongooseModule.forFeature([{name:"trainings", schema: trainingsSchema}]),
    MongooseModule.forFeature([{name:"votes", schema: votesSchema}])],
    controllers:[voteurController],
    providers:[voteurService],
})
export class voteurModule {
    
}