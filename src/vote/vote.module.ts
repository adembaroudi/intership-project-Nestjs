import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { trainingsSchema } from "src/training/schemas/training.schema";
import { votesSchema } from "./schema/vote.schema";
import { voteController } from "./vote.controller";
import { voteService } from "./vote.service";

@Module({
    imports:[
    MongooseModule.forFeature([{name:"vote", schema: votesSchema}]),
    MongooseModule.forFeature([{name:"trainings", schema: trainingsSchema}])],
    controllers:[voteController],
    providers:[voteService],
})
export class voteModule {
    
}