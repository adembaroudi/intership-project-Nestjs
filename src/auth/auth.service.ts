import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { company, service, training } from "./auth.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { trainingReg } from "./interfaces/trainingreg.interace";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { Training } from "src/training/training.model";
import * as nodemailer from "nodemailer";
import { log } from "console";
import { companyRegDto } from "./Dto/companyRegDto.dto";
import path from "path";
import { registerAdminDto } from "./Dto/admin.dto";
import { Admin } from "./interfaces/admin.interface";
import * as bcrypt from 'bcryptjs';
import { LogintDto } from "./Dto/loginAdmin.dto";
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from "@nestjs/jwt";
import { ForgottenPassword } from "./interfaces/forgetpassword.interface";
import { ForgetDto } from "./Dto/forget.dto";
import { ResetpasswordDto } from "./Dto/resetpassword.dto";
import * as jwt from 'jsonwebtoken';



@Injectable()
export class AuthService {
  private training: training[] = [];
  private serviceRegistration: service[] = [];
  private companyRegistration: company[] = [];
  private adminRegistration: Admin[] = [];
  private ForgottenPassword : ForgottenPassword[]= [];

  constructor(
    @InjectModel("trainingreg")
    private readonly trainingModel: Model<trainingReg>,
    @InjectModel("servicereg") private readonly serviceRegmodel: Model<service>,
    @InjectModel("companyreg") private readonly companyRegmodel: Model<company>,
    @InjectModel("training") private readonly trainModel: Model<Training>,
    @InjectModel("admin") private readonly adminModel: Model<Admin>,
    @InjectModel('Forget') private readonly forgetModel: Model<ForgottenPassword>,

    private jwtService: JwtService


  ) {}
// pour l'inscription dans une session//
  async trainingReg(
    trainingRegDto: trainingRegistrationDto,
    id:String,
  ): Promise<any> {
    const training = await this.trainingModel.findOne({
      email: trainingRegDto.email,
    });
   
      if (training) {
        return null;
      }
      const trainingreg = await this.trainingModel.create(trainingRegDto);
      const train = await this.trainModel.findByIdAndUpdate(
        id,
        {
          $push: { trainingRegistrations: trainingreg._id },
        },
        {
          new: true,
        }
      );
      await this.trainingModel.findByIdAndUpdate(trainingreg._id, {
        training: train._id,
      });
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        tls: {
          rejectUnauthorized: false,
        },
        port: 465,
        secure: false,
        auth: {
          user: "crmproject.2020@gmail.com",
          pass: "123456789crm",
        },
      });
      const mailOptions = {
        to: "adembaroudi3177@gmail.com",
        from: "crmproject.2020@gmail.com",
        subject: "nouvelle inscription pour session",
        html: `<ul><h5>this email is from : <p>${trainingRegDto.firstname} ${trainingRegDto.lastname}</p></h5> <li>telephone: ${trainingRegDto.numTel}</li><li>email: ${trainingRegDto.email}</li><li>Diplome: ${trainingRegDto.diplome}</li><li>online: ${trainingRegDto.online}</li><li>Présence: ${trainingRegDto.typePresence}</li></ul>`,
      };
      const sended = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log("Message sent: %s", error);
            return reject(false);
          }
          console.log("Message sent 1 : %s", info);
          resolve(true);
        });
      });
      return [sended, train];
    // }
   
  }
// pour l'inscription dans une session//

// pour l'inscription sans choisir la session//
  async trainingRegWithoutAffectation(
    trainingRegDto: trainingRegistrationDto
  ): Promise<any> {
    const training = await this.trainingModel.findOne({
      email: trainingRegDto.email,
    });
    if (training) {
      return null;
    }
    const trainingreg = await this.trainingModel.create(trainingRegDto);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      tls: {
        rejectUnauthorized: false,
      },
      port: 465,
      secure: false,
      auth: {
        user: "crmproject.2020@gmail.com",
        pass: "123456789crm",
      },
    });
    const mailOptions = {
      to: "adembaroudi3177@gmail.com",
      from: "crmproject.2020@gmail.com",
      subject: "new registration sans choisir la session ",
      html: `<ul><h5>this email is from : <p>${trainingRegDto.firstname} ${trainingRegDto.lastname}</p></h5> <li>telephone: ${trainingRegDto.numTel}</li><li>email: ${trainingRegDto.email}</li><li>Diplome: ${trainingRegDto.diplome}</li><li>online: ${trainingRegDto.online}</li><li>Présence: ${trainingRegDto.typePresence}</li></ul>`,
    };
    const sended = await new Promise<boolean>(async function (resolve, reject) {
      return await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log("Message sent: %s", error);
          return reject(false);
        }
        console.log("Message sent 1 : %s", info);
        resolve(true);
      });
    });
    return [sended, trainingreg];
  }
// pour l'inscription sans choisir la session//

// l'inscription dans un service five points (coaching/consulting/developpement)//
  async serviceReg(serviceRegDto: serviceRegistrationDto): Promise<any> {
    const service = await this.serviceRegmodel.findOne({
      email: serviceRegDto.email,
    });
    if (service) {
      return null;
    }
    const serviceReg = await this.serviceRegmodel.create(serviceRegDto);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      tls: {
        rejectUnauthorized: false,
      },
      port: 465,
      secure: false,
      auth: {
        user: "crmproject.2020@gmail.com",
        pass: "123456789crm",
      },
    });
    const mailOptions = {
      to: "adembaroudi3177@gmail.com",
      from: "crmproject.2020@gmail.com",
      subject: serviceRegDto.sujet,
      html: `<ul><h5>this email is from : <p>${serviceRegDto.firstname} ${serviceRegDto.lastname}</p></h5> <li>telephone: ${serviceRegDto.numTel}</li><li>curriculumn vitae: ${serviceRegDto.cv}</li><li>email: ${serviceRegDto.email}</li><li>service: ${serviceRegDto.service}</li><li>sujet: ${serviceRegDto.sujet}</li></ul>`,

      // attachements: [
      //   {
      //     filename: "Adem.pdf",
      //     path:  path.join(__dirname, '../../upload/Adem.pdf'),       
      //     contentType: 'application/pdf'
      //   },
      // ],
    };
    const sended = await new Promise<boolean>(async function (resolve, reject) {
      return await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log("Message sent: %s", error);
          return reject(false);
        }
        console.log("Message sent 1 : %s", info);
        console.log(mailOptions);
        resolve(true);
      });
    });
    return serviceReg;
  }
// l'inscription dans un service five points (coaching/consulting/developpement)//

// l'inscription dans un service five points pour les sociétes(coaching/consulting/developpement)//

  async companyReg(companyRegDto: companyRegDto): Promise<any> {
    const company = await this.companyRegmodel.findOne({
      email: companyRegDto.email,
    });
    if (company) {
      return null;
    }
    const companyReg = await this.companyRegmodel.create(companyRegDto);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      tls: {
        rejectUnauthorized: false,
      },
      port: 465,
      secure: false,
      auth: {
        user: "crmproject.2020@gmail.com",
        pass: "123456789crm",
      },
    });
    const mailOptions = {
      to: "adembaroudi3177@gmail.com",
      from: "crmproject.2020@gmail.com",
      subject: companyRegDto.sujet,
      html: `<ul><h5>this email is from : <p>${companyRegDto.companyName} </p></h5> <li>telephone: ${companyRegDto.numTel}</li><li>email: ${companyRegDto.email}</li><li>service: ${companyRegDto.service}</li><li>sujet: ${companyRegDto.sujet}</li></ul>`,
    };
    const sended = await new Promise<boolean>(async function (resolve, reject) {
      return await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log("Message sent: %s", error);
          return reject(false);
        }
        console.log("Message sent 1 : %s", info);
        console.log(mailOptions);
        resolve(true);
      });
    });
    return companyReg;
  }
// l'inscription dans un service five points (coaching/consulting/developpement)//

//get all service five poiçnts registrations// 
  async getAllRgistrations(): Promise<any> {
    const allreg = await this.serviceRegmodel.find();
    const allCompanyReg = await this.companyRegmodel.find()
    return [allreg , allCompanyReg];
  }
//get all service five poiçnts registrations// 

//upload pdf //
  async pdfFile(file, id): Promise<service> {
    return await this.serviceRegmodel
      .findByIdAndUpdate({ _id: id }, { $set: { cv: file } })
      .exec();
  }
//upload pdf //

//get pdf file//
  async getpdf(id): Promise<service> {
    const pdf = await this.serviceRegmodel.findById(id);
    const getLogo = pdf.cv;
    return getLogo;
  }
//get pdf file//
async registerAdmin(adminDto: registerAdminDto): Promise<Admin>{
  const admin = await this.adminModel.findOne({email:adminDto.email});
  if (admin) {
      return null
  } else {
      const salt = 10;
      adminDto.password = await bcrypt.hash(adminDto.password, salt);
      const admin = await this.adminModel.create(adminDto);
      return admin
  }
}
async loginAdmin(logindto : LogintDto){

  const admin = await this.adminModel.findOne({email:logindto.email})

  if(!admin){
    return null 
  } else {
      const isvalidpass = await bcrypt.compare(logindto.password, admin.password);
      if(isvalidpass){
        return this.createJwtPayload(admin);
        }else {
            return null
        }
    
  } 
}
createJwtPayload(user){

  let data: JwtPayload = {
      email: user.email,
      _id: user._id,
      role: user.role
  };

  let jwt = this.jwtService.sign(data);

  return jwt

}
async forgetpassword(forgetdto: ForgetDto): Promise<boolean>{

  const email = forgetdto.email
  const admin = await this.adminModel.findOne({email: email});
  const tokenModel = await this.createForgottenPasswordToken(forgetdto);

  if (!admin) {
      return null;
  } else {
      const transporter = nodemailer.createTransport({
          service: "Gmail",
          tls: {
            rejectUnauthorized: false,
          },
          port: 465,
          secure: false, // true for 465, false for other ports
          auth: {
              user: "crmproject.2020@gmail.com",
              pass: "123456789crm"
          }
      });
  
      const mailOptions = {
        from: "crmproject.2020@gmail.com", 
        to: "adembaroudi3177@gmail.com", // list of receivers (separated by ,)
        subject: 'Frogotten Password', 
        text: 'Forgot Password',
        //+ config.host.url + ':' + config.host.port +
        html:` Hi! <br><br> If you requested to reset your password<br><br>
        <a href= localhost:4200/auth/reset-password/ ${tokenModel} >Click here</a>`  // html body
      };
      const sended = await new Promise<boolean>(async function(resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {      
              console.log('Message sent: %s', error);
              return reject(false);
            }
            console.log('Message sent 1 : %s', info);
            resolve(true);
        });      
      })

      return sended;
  }
}
async createForgottenPasswordToken(forgetdto: ForgetDto): Promise<ForgottenPassword> {
  const token = await new this.forgetModel(forgetdto);
token.save()
  var forgottenPassword= await this.forgetModel.findOne({email: forgetdto.email});
  if ( !forgottenPassword){
    throw new HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
  } else {
    let token_access = jwt.sign({
      data:forgottenPassword
  },
  "secret");
    var forgetModel = await this.forgetModel.findOneAndUpdate(
      {email: forgetdto.email},
      { 
        email: forgetdto.email,
        newPasswordToken: token_access,
      },
      {upsert: true, new: true}
    );
    if(forgetModel){
      return forgetModel;
    } else {
      throw new HttpException('LOGIN.ERROR.GENERIC_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
async resetpassword(id: string,resetpassworddto: ResetpasswordDto): Promise<Admin>{
  if (resetpassworddto.newpassword === resetpassworddto.confirmpassword) {
    const salt = 10
    resetpassworddto.confirmpassword = await bcrypt.hash(resetpassworddto.confirmpassword,salt)
    const admin = this.adminModel.findByIdAndUpdate(id,{password: resetpassworddto.confirmpassword});
    return admin
  }
  return null
}

}
