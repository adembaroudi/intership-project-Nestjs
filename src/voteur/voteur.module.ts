import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { trainingsSchema } from "src/training/schemas/training.schema";

import { voteurSchema } from "./schemas/voteur.schema";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { voteurController } from "./voteur.controller";
import { voteurService } from "./voteur.service";

@Module({
    imports:[
    MongooseModule.forFeature([{name:"voteur", schema: voteurSchema}]),
    MongooseModule.forFeature([{name:"trainings", schema: trainingsSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
            secretOrPrivateKey: 'thisismykickasssecretthatiwilltotallychangelater',
            signOptions: {
              expiresIn: 3600
            }
          }),],
    controllers:[voteurController],
    providers:[voteurService , JwtStrategy],
})
export class voteurModule {
    
}       