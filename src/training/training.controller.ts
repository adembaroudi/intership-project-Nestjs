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
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { TrainingDto } from "./dto/training.dto";
import { trainingService } from "./training.service";
import * as multer from "multer";
import * as path from "path";
import { FileInterceptor } from "@nestjs/platform-express";

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
  @Get("/intro/:id")
  async introDesc(@Param("id") id: String) {
    const intro = await this.trainService.getIntroDesc(id);
    return intro;
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
  @Put("/voteTrainings/:id")
  async vote(@Param('id')id : String , @Body()object ){
    const train = await this.trainService.vote(id , object) 
    return train
  }
  @UseInterceptors(
    FileInterceptor("image", {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "upload/");
        },
        filename: (req, file, cb) => {
          cb(
            null,
            Date.now() +
              file.originalname.slice(file.originalname.lastIndexOf("."))
          );
        },
      }),
    }) 
  )
  @Put("/Trainings/file/:id")
  async uploadLogoCompany(
    @Res() res,
    @UploadedFile() file,
    @Param("id") id
  ): Promise<any> {
    if (
      path.extname(`${file.filename}`) === ".png" ||
      path.extname(`${file.filename}`) === ".jpg" ||
      path.extname(`${file.filename}`) === ".JPG"||
      path.extname(`${file.filename}`) === ".jpeg"
    ) {
      this.trainService.logoTrainingPic(`${file.filename}`, id);
      await res.json(file.path);
    }
    return { message: "not an Image" };
  }

  @Get("getTrainingLogo/:id")
  async getFiles(@Param("id") id: String, @Res() res) {
    const getlogo = await this.trainService.getLogo(id);
    return res.sendFile(getlogo, { root: "upload" });
  }
} 
