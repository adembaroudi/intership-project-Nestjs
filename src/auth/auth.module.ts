import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { trainingsSchema } from 'src/training/schemas/training.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { serviceRegistrationSchema } from './schemas/serviceRegistration.schema';
import { trainingRegSchema } from './schemas/trainingregistration.schema';
@Module({
    imports:[
        MongooseModule.forFeature([{name: 'trainingreg', schema: trainingRegSchema}]),
    MongooseModule.forFeature([{name:"servicereg", schema: serviceRegistrationSchema}]),
    MongooseModule.forFeature([{name:"training", schema: trainingsSchema}]),
],
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule {
    
}
