import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Training } from "./training.model";
import { Model } from "mongoose";
import { TrainingDto } from "./dto/training.dto";
import { User } from "src/user/user.model";

@Injectable()
export class trainingService {
  private Training: Training[] = [];
  constructor(
    @InjectModel("trainings") private readonly trainModel: Model<Training>,
    @InjectModel("user") private readonly userModel: Model<User>
  ) {}
  async addTraining(id: String, trainingDto: TrainingDto): Promise<Training> {
    const training = await this.trainModel.create(trainingDto);
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        $push: { trainings: training._id },
      },
      {
        new: true,
      }
    );
    await this.trainModel.findByIdAndUpdate(training._id, { user: user._id });
    return user;
  }
  async getAllTraining(): Promise<Training> {
    const getAll = await this.trainModel.find().populate("user").exec();
    return getAll;
  }
  async getTrainingById(id: String): Promise<Training> {
    const getById = await this.trainModel.findById(id).populate("user").exec();
    return getById;
  }
  async getIntroDesc(id : String):Promise<any>{
    const training = await this.trainModel.findById(id)
    const intro = training.Description.slice(0,30)+"...";
    return intro
  }

  async updateTraining(
    id: String,
    trainingDto: TrainingDto
  ): Promise<Training> {
    const upTrain = await this.trainModel.findByIdAndUpdate(id, trainingDto, {
      new: true,
    });
    return upTrain;
  }
  async deleteTraining(id: String) {
    const deleteTrain = await this.trainModel.findByIdAndDelete(id);
    await this.userModel.findByIdAndUpdate(deleteTrain.user, {
      $pull: {
        trainings: deleteTrain._id,
      },
    });
    return { message: "training deleted" };
  }
  async vote(id: String, objet): Promise<Training> {
    const train = await this.trainModel.findById(id);
 
    if (objet.choice === "like") {
      train.nblike += 1;
    } 
    const trainVoted = await this.trainModel.findByIdAndUpdate(
      train._id,
      train, 
      { new: true }
    );
    return trainVoted;
  }
  async logoTrainingPic(file, id): Promise<Training> {
    // const link = "http://localhost:3000/upload/" + file
    return await this.trainModel
      .findByIdAndUpdate({ _id: id }, { $set: { picture: file } })
      .exec();
  }
  async getLogo(id): Promise<Training> {
    const train = await this.trainModel.findById(id);
    const getLogo = train.picture;
    return getLogo;
  }
}
