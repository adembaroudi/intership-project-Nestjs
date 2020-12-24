import { Injectable } from "@nestjs/common";
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

@Injectable()
export class AuthService {
  private training: training[] = [];
  private serviceRegistration: service[] = [];
  private companyRegistration: company[] = [];
  constructor(
    @InjectModel("trainingreg")
    private readonly trainingModel: Model<trainingReg>,
    @InjectModel("servicereg") private readonly serviceRegmodel: Model<service>,
    @InjectModel("companyreg") private readonly companyRegmodel: Model<company>,
    @InjectModel("training") private readonly trainModel: Model<Training>
  ) {}

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
        subject: "new registration for session",
        html: `<ul><h5>this email is from : <p>${trainingRegDto.firstname} ${trainingRegDto.lastname}</p></h5> <li>telephone: ${trainingRegDto.numTel}</li><li>email: ${trainingRegDto.email}</li></ul>`,
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
      html: `<ul><h5>this email is from : <p>${trainingRegDto.firstname} ${trainingRegDto.lastname}</p></h5> <li>telephone: ${trainingRegDto.numTel}</li><li>email: ${trainingRegDto.email}</li></ul>`,
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
  async getAllRgistrations(): Promise<any> {
    const allreg = await this.serviceRegmodel.find();
    const allCompanyReg = await this.companyRegmodel.find()
    return [allreg , allCompanyReg];
  }
  async pdfFile(file, id): Promise<service> {
    return await this.serviceRegmodel
      .findByIdAndUpdate({ _id: id }, { $set: { cv: file } })
      .exec();
  }

  async getpdf(id): Promise<service> {
    const pdf = await this.serviceRegmodel.findById(id);
    const getLogo = pdf.cv;
    return getLogo;
  }
}
