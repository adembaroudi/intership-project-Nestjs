import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { TrainingDto } from "./dto/training.dto";
import { trainingService } from "./training.service";

@Controller("training")
export class trainingController {
  constructor(private trainService: trainingService) {}
  @Post("Trainings/:id")
  async addtraining(
    @Param("id") id: String,
    @Res() res,
    @Body() trainDto: TrainingDto
  ) {
    const training = await this.trainService.addTraining(id, trainDto);
    return res.status(HttpStatus.OK).json({
      message: "training added successuly",
      training: training,
    });
  }
  @Get("/Trainings")
  async getAlltrainings() {
    const getAll = await this.trainService.getAllTraining();
    return getAll;
  }
  @Get("/Trainings/:id")
  async getbyId(@Param("id") id: String) {
    const getId = await this.trainService.getTrainingById(id);
    return getId;
  }
  @Put("/Trainings/:id")
  async updateTraining(
    @Param("id") id: String,
    @Res() res,
    @Body() trainDto: TrainingDto
  ) {
    const uptrain = await this.trainService.updateTraining(id, trainDto);
    return res.status(HttpStatus.OK).json({
      message: "training updated successuly",
      training: uptrain,
    });
  }
  @Delete("/Trainings/:id")
  async deletetraining(@Param("id") id: String, @Res() res) {
    await this.trainService.deleteTraining(id);
    return res.status(HttpStatus.OK).json({
      message: "training deletetd successuly",
    });
  }
}
