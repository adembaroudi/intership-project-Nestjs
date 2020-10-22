import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { partenairesController } from "./partenaires.controller";
import { partenairesServices } from "./partenaires.service";
import { partenairesSchema } from "./schemas/partenaires.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:"partenaires", schema:partenairesSchema}])

    ],
    controllers : [partenairesController],
    providers : [partenairesServices]
    })
export class partenairesModule{

}