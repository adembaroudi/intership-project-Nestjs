import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Training } from "./training.model";
import {Model} from 'mongoose'
import { TrainingDto } from "./dto/training.dto";
import { User } from "src/user/user.model";
import { get } from "https";
import { Trainings } from "./interface/training.interface";
@Injectable()
export class trainingService{
    private Training : Training[] = [];
    constructor(@InjectModel('training') private readonly trainModel : Model<Training>,
    @InjectModel('user') private readonly userModel : Model<User>){}
    async addTraining(id  :String , trainingDto : TrainingDto) : Promise<Training>{
        const training = await  this.trainModel.create(trainingDto);
        const user = await this.userModel.findByIdAndUpdate(
            id,
            {
              $push: { training: training._id },
            },
            {
              new: true,
            }
          );
          await this.trainModel.findByIdAndUpdate(training._id,{user:user._id})
          return user;
        }
        async getAllTraining():Promise<Training>{
            const getAll = await this.trainModel.find()
            return getAll;
        }
      async getTrainingById(id : String ):Promise<Training>{
          const getById =await this.trainModel.findById(id);
          return getById;
      }
      async updateTraining(id : String , trainingDto : TrainingDto):Promise<Training>{
          const upTrain = await this.trainModel.findByIdAndUpdate(id , trainingDto,{new : true});
          return upTrain;
      }
      async deleteTraining(id : String){
          const deleteTrain = await this.trainModel.findByIdAndDelete(id);
          await this.userModel.findByIdAndUpdate(deleteTrain.user,{$pull:{
            trainings : deleteTrain._id}
        })  
        return {message : "training deleted"}
    }

      }
    
