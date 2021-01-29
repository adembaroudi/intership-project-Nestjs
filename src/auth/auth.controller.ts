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
import { registerAdminDto } from "./Dto/admin.dto";
import { companyRegDto } from "./Dto/companyRegDto.dto";
import { ForgetDto } from "./Dto/forget.dto";
import { LogintDto } from "./Dto/loginAdmin.dto";
import { ResetpasswordDto } from "./Dto/resetpassword.dto";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/trainingregister/:idtraining")
  async trainingReg(
    @Res() res,
    @Body() trainingReg: trainingRegistrationDto,
    @Param("idtraining") idtraining?:String,
  ) {
    const training = await this.authService.trainingReg(
      trainingReg,
      idtraining,
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
  @Post("/trainingregister")
  async trainingRegwithoutAffectation(
  
    @Res() res,
    @Body() trainingReg: trainingRegistrationDto
  ) {
    const training = await this.authService.trainingRegWithoutAffectation(
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
  @Post("/serviceRegistration")
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
  @Post("/companyRegistration")
  async companyRegistration(
    @Res() res,
    @Body() companyReg: companyRegDto
  ) {
    const company = await this.authService.companyReg(companyReg);
    if (company === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "email in use",
      });
    }
    return res.status(HttpStatus.OK).json({
      message: "Register succes",
      company: company,
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
  @Post("/admin")
  async registerAdmin(
    @Res() res,
    @Body() adminDto: registerAdminDto
  ) {
    const admin = await this.authService.registerAdmin(adminDto);
    if (admin === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "email in use",
      });
    }
    return res.status(HttpStatus.OK).json({
      message: "Register succes",
      admin: admin,
    });
  }
  @Post("/login")
  async loginAdmin(@Res() res, @Body() logindto: LogintDto) {
    const admin = await this.authService.loginAdmin(logindto);
    if (admin === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "email or password incorrecte",
      });
    }
    return res.status(HttpStatus.OK).json({
      message: "admin logged in successfully",
      admin: admin,
    });
  }
  @Get("/forgot-password")
  async sendEmailForgotPassword(
    @Body() forgetdto: ForgetDto,
    @Res() res
  ): Promise<any> {
    //   try {
    var isEmailSent = await this.authService.forgetpassword(forgetdto);
    if (isEmailSent === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "error",
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: "succes",
        mail: isEmailSent,
      });
    }
  }
  @Put("/reset/:id")
  async resetpassword(
    @Param("id") id: string,
    @Body() resetpassworddto: ResetpasswordDto,
    @Res() res
  ) {
    const admin = await this.authService.resetpassword(id, resetpassworddto);
    if (admin === null) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: "not found",
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: "success",
        admin: admin,
      });
    }
  }
}
