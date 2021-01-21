import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { trainingsSchema } from 'src/training/schemas/training.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { serviceRegistrationSchema } from './schemas/serviceRegistration.schema';
import { trainingRegSchema } from './schemas/trainingregistration.schema';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { companyRegistrationSchema } from './schemas/companyRegistrationSchema';
import { adminSchema } from './schemas/admin.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports:[
        MongooseModule.forFeature([{name: 'trainingreg', schema: trainingRegSchema}]),
    MongooseModule.forFeature([{name:"servicereg", schema: serviceRegistrationSchema}]),
    MongooseModule.forFeature([{name:"companyreg", schema: companyRegistrationSchema}]),
    MongooseModule.forFeature([{name:"training", schema: trainingsSchema}]),
    MongooseModule.forFeature([{name:"admin", schema: adminSchema}]),
    JwtModule.register({
        secretOrPrivateKey: 'thisismykickasssecretthatiwilltotallychangelater',
        signOptions: {
          expiresIn: 3600
        }
      }),
    ServeStaticModule.forRoot({
        rootPath: join(__dirname,'..', 'upload'),
      }),
],
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule {
    
}
 