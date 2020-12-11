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
  @Post("Trainings/:iduser")
  async addtraining(
    @Param("iduser") iduser: String,
    @Res() res,
    @Body() trainDto: TrainingDto
  ) {
    const training = await this.trainService.addTraining(iduser, trainDto);
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
  @Get("/Trainings/:idtraining")
  async getbyId(@Param("idtraining") idtraining: String) {
    const getId = await this.trainService.getTrainingById(idtraining);
    return getId;
  }
  @Get("/intro/:idtraining")
  async introDesc(@Param("idtraining") idtraining: String) {
    const intro = await this.trainService.getIntroDesc(idtraining);
    return intro;
  }
  @Put("/Trainings/:idtraining")
  async updateTraining(
    @Param("idtraining") idtraining: String,
    @Res() res,
    @Body() trainDto: TrainingDto
  ) {
    const uptrain = await this.trainService.updateTraining(idtraining, trainDto);
    return res.status(HttpStatus.OK).json({
      message: "training updated successuly",
      training: uptrain,
    });
  }
  @Delete("/Trainings/:idtraining")
  async deletetraining(@Param("idtraining") idtraining: String, @Res() res) {
    await this.trainService.deleteTraining(idtraining);
    return res.status(HttpStatus.OK).json({
      message: "training deletetd successuly",
    });
  }

  @UseInterceptors(
    FileInterceptor("image", {
      storage: multer.diskStorage({
        limits: { fileSize: 1*2000*2000 },
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
        size : 10690 
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
