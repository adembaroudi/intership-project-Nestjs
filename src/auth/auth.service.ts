import { Injectable } from "@nestjs/common";
import { service, training } from "./auth.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { trainingReg } from "./interfaces/trainingreg.interace";
import { trainingRegistrationDto } from "./Dto/trainingregistration.dto";
import { serviceRegistrationDto } from "./Dto/serviceRegistration.dto";
import { Training } from "src/training/training.model";
import * as nodemailer from "nodemailer";


@Injectable()
export class AuthService {
    private training : training[]= [];
    private serviceRegistration : service [] = [];
    constructor(
   
    @InjectModel('trainingreg') private readonly trainingModel: Model<trainingReg>,
    @InjectModel('servicereg') private readonly serviceRegmodel : Model<service>,
    @InjectModel('training') private readonly trainModel : Model<Training>
    ){}

    async trainingReg(id: String , trainingRegDto: trainingRegistrationDto): Promise<any>{
        const training = await this.trainingModel.findOne({email:trainingRegDto.email});
        if (training) {
            return null
        } 
        const trainingreg = await new this.trainingModel(trainingRegDto);
       
        const train = await this.trainModel.findByIdAndUpdate(
            id,
            {
              $push: { trainingRegistrations: trainingreg._id },
            },
            {
              new: true,
            }
          );
          await this.trainingModel.findByIdAndUpdate(trainingreg._id,{training:train._id})
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
             html:`<ul><h5>this email is from : <p>${trainingRegDto.firstname} ${trainingRegDto.lastname}</p></h5> <li>telephone: ${trainingRegDto.numTel}</li><li>email: ${trainingRegDto.email}</li></ul>` 
          
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
          return [sended,train];
    }

    async serviceReg(serviceRegDto: serviceRegistrationDto ): Promise<any>{
        const service = await this.serviceRegmodel.findOne({email:serviceRegDto.email});
        if (service) {
            return null
        }
        const serviceReg = await new this.serviceRegmodel(serviceRegDto)
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
          html:`<ul><h5>this email is from : <p>${serviceRegDto.firstname} ${serviceRegDto.lastname}</p></h5> <li>telephone: ${serviceRegDto.numTel}</li><li>email: ${serviceRegDto.email}</li></ul>` 

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
        return [sended ,serviceReg];
      
    }
    async getAllRgistrations():Promise<service>{
      const allreg = await this.serviceRegmodel.find()
      return allreg
    }
  
}