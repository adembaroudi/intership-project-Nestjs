"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const training_model_1 = require("../training/training.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(trainingModel, serviceRegmodel, companyRegmodel, trainModel, adminModel, forgetModel, jwtService) {
        this.trainingModel = trainingModel;
        this.serviceRegmodel = serviceRegmodel;
        this.companyRegmodel = companyRegmodel;
        this.trainModel = trainModel;
        this.adminModel = adminModel;
        this.forgetModel = forgetModel;
        this.jwtService = jwtService;
        this.training = [];
        this.serviceRegistration = [];
        this.companyRegistration = [];
        this.adminRegistration = [];
        this.ForgottenPassword = [];
    }
    async trainingReg(trainingRegDto, id) {
        const training = await this.trainingModel.findOne({
            email: trainingRegDto.email,
        });
        if (training) {
            return null;
        }
        const trainingreg = await this.trainingModel.create(trainingRegDto);
        const train = await this.trainModel.findByIdAndUpdate(id, {
            $push: { trainingRegistrations: trainingreg._id },
        }, {
            new: true,
        });
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
        const sended = await new Promise(async function (resolve, reject) {
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
    }
    async trainingRegWithoutAffectation(trainingRegDto) {
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
        const sended = await new Promise(async function (resolve, reject) {
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
    async serviceReg(serviceRegDto) {
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
        };
        const sended = await new Promise(async function (resolve, reject) {
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
    async companyReg(companyRegDto) {
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
        const sended = await new Promise(async function (resolve, reject) {
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
    async getAllRgistrations() {
        const allreg = await this.serviceRegmodel.find();
        const allCompanyReg = await this.companyRegmodel.find();
        return [allreg, allCompanyReg];
    }
    async pdfFile(file, id) {
        return await this.serviceRegmodel
            .findByIdAndUpdate({ _id: id }, { $set: { cv: file } })
            .exec();
    }
    async getpdf(id) {
        const pdf = await this.serviceRegmodel.findById(id);
        const getLogo = pdf.cv;
        return getLogo;
    }
    async registerAdmin(adminDto) {
        const admin = await this.adminModel.findOne({ email: adminDto.email });
        if (admin) {
            return null;
        }
        else {
            const salt = 10;
            adminDto.password = await bcrypt.hash(adminDto.password, salt);
            const admin = await this.adminModel.create(adminDto);
            return admin;
        }
    }
    async loginAdmin(logindto) {
        const admin = await this.adminModel.findOne({ email: logindto.email });
        if (!admin) {
            return null;
        }
        else {
            const isvalidpass = await bcrypt.compare(logindto.password, admin.password);
            if (isvalidpass) {
                return this.createJwtPayload(admin);
            }
            else {
                return null;
            }
        }
    }
    createJwtPayload(user) {
        let data = {
            email: user.email,
            _id: user._id,
            role: user.role
        };
        let jwt = this.jwtService.sign(data);
        return jwt;
    }
    async forgetpassword(forgetdto) {
        const email = forgetdto.email;
        const admin = await this.adminModel.findOne({ email: email });
        const tokenModel = await this.createForgottenPasswordToken(forgetdto);
        if (!admin) {
            return null;
        }
        else {
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                tls: {
                    rejectUnauthorized: false,
                },
                port: 465,
                secure: false,
                auth: {
                    user: "crmproject.2020@gmail.com",
                    pass: "123456789crm"
                }
            });
            const mailOptions = {
                from: "crmproject.2020@gmail.com",
                to: "adembaroudi3177@gmail.com",
                subject: 'Frogotten Password',
                text: 'Forgot Password',
                html: ` Hi! <br><br> If you requested to reset your password<br><br>
        <a href= localhost:4200/auth/reset-password/ ${tokenModel} >Click here</a>`
            };
            const sended = await new Promise(async function (resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log('Message sent: %s', error);
                        return reject(false);
                    }
                    console.log('Message sent 1 : %s', info);
                    resolve(true);
                });
            });
            return sended;
        }
    }
    async createForgottenPasswordToken(forgetdto) {
        const token = await new this.forgetModel(forgetdto);
        token.save();
        var forgottenPassword = await this.forgetModel.findOne({ email: forgetdto.email });
        if (!forgottenPassword) {
            throw new common_1.HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            let token_access = jwt.sign({
                data: forgottenPassword
            }, "secret");
            var forgetModel = await this.forgetModel.findOneAndUpdate({ email: forgetdto.email }, {
                email: forgetdto.email,
                newPasswordToken: token_access,
            }, { upsert: true, new: true });
            if (forgetModel) {
                return forgetModel;
            }
            else {
                throw new common_1.HttpException('LOGIN.ERROR.GENERIC_ERROR', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async resetpassword(id, resetpassworddto) {
        if (resetpassworddto.newpassword === resetpassworddto.confirmpassword) {
            const salt = 10;
            resetpassworddto.confirmpassword = await bcrypt.hash(resetpassworddto.confirmpassword, salt);
            const admin = this.adminModel.findByIdAndUpdate(id, { password: resetpassworddto.confirmpassword });
            return admin;
        }
        return null;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("trainingreg")),
    __param(1, mongoose_1.InjectModel("servicereg")),
    __param(2, mongoose_1.InjectModel("companyreg")),
    __param(3, mongoose_1.InjectModel("training")),
    __param(4, mongoose_1.InjectModel("admin")),
    __param(5, mongoose_1.InjectModel('Forget')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _d : Object, typeof (_e = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _e : Object, typeof (_f = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _f : Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map