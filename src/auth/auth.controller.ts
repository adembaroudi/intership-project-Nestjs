import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import * as multer from "multer";
import * as path from "path";
import { AuthService } from "./auth.service";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/trainingregister/:idtraining")
  async trainingReg(
    @Param("idtraining") idtraining: String,
    @Res() res,
    @Body() trainingReg: trainingRegistrationDto
  ) {
    const training = await this.authService.trainingReg(
      idtraining,
      trainingReg
    );
    if (training === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "email in use",
      });
    }
    return res.status(HttpStatus.OK).json({
      message: "Register succes",
      training: training,
    });
  }
  @Post("/ServiceRegistration")
  async serviceRegistration(
    @Res() res,
    @Body() serviceReg: serviceRegistrationDto
  ) {
    const service = await this.authService.serviceReg(serviceReg);
    if (service === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "email in use",
      });
    }
    return res.status(HttpStatus.OK).json({
      message: "Register succes",
      service: service,
    });
  }
  @Get("/ServiceRegistration")
  async showAllRegistrations() {
    const all = await this.authService.getAllRgistrations();
    return all;
  }
  @UseInterceptors(
    FileInterceptor("pdf", {
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
          // cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
        },
      }),
    })
  )
  @Put("/file/:idservicereg")
  async uploadLogoCompany(
    @Res() res,
    @UploadedFile() file,
    @Param("idservicereg") idservicereg
  ): Promise<any> {
    if (path.extname(`${file.filename}`) === ".pdf") {
      this.authService.pdfFile(`${file.filename}`, idservicereg);
      await res.json(file.path);
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "not an PDF",
      });
    }
  }
  @Get("download")
  async downloadPdf(@Res() res) {
    const Name = 'Adem.pdf';
    res.download("c:\\upload\\" + Name);
  }

  @Get("getpdf/:idservicereg")
  async getFiles(@Param("idservicereg") idservicereg: String, @Res() res) {
    const getpdf = await this.authService.getpdf(idservicereg);
    return res.sendFile(getpdf, { root: "upload" });
  }
}
