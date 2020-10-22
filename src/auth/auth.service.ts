import { Injectable } from "@nestjs/common";
import { service, training } from "./auth.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { trainingReg } from "./interfaces/trainingreg.interace";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { Training } from "src/training/training.model";

@Injectable()
export class AuthService {
    private training : training[]= [];
    private serviceRegistration : service [] = [];
    constructor(
   
    @InjectModel('trainingreg') private readonly trainingModel: Model<trainingReg>,
    @InjectModel('servicereg') private readonly serviceRegmodel : Model<service>,
    @InjectModel('training') private readonly trainModel : Model<Training>
    ){}

    async trainingReg(id: String , trainingRegDto: trainingRegistrationDto): Promise<trainingReg>{
        const training = await this.trainingModel.findOne({email:trainingRegDto.email});
        if (training) {
            return null
        } 
        const trainingreg = await new this.trainingModel(trainingRegDto);
       
        const formation = await this.trainModel.findByIdAndUpdate(
            id,
            {
              $push: { trainingreg: trainingreg._id },
            },
            {
              new: true,
            }
          );
          await this.trainModel.findByIdAndUpdate(training._id,{formation:formation._id})
          return formation;
    }
    async serviceReg(serviceRegDto: serviceRegistrationDto ): Promise<service>{
        const service = await this.serviceRegmodel.findOne({email:serviceRegDto.email});
        if (service) {
            return null
        }
        const serviceReg = await new this.serviceRegmodel(serviceRegDto)
        return serviceReg.save()
    }
    async getAllRgistrations():Promise<service>{
      const allreg = await this.serviceRegmodel.find()
      return allreg
    }
  
}