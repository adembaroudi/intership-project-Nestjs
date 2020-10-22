import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post("/register/training/:id")
    async trainingReg(
      @Param('id')id : String,
      @Res() res,
      @Body() trainingReg: trainingRegistrationDto
    ) {
      const training = await this.authService.trainingReg(id,trainingReg);
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
    @Get('/ServiceRegistration')
    async showAllRegistrations(){
      const all = await this.authService.getAllRgistrations();
      return all;
    }
}