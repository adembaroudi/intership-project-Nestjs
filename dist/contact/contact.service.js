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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nodemailer = require("nodemailer");
let contactService = class contactService {
    constructor(contactModel) {
        this.contactModel = contactModel;
        this.contact = [];
    }
    async addMessage(contactDto) {
        const message = await this.contactModel.create(contactDto);
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
            subject: contactDto.subject,
            text: "this email is from :" +
                " " +
                `${contactDto.email}` +
                `${contactDto.contenuMessage}`,
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
        return sended;
    }
    async getAllMsgs() {
        const getMsgs = await this.contactModel.find();
        return getMsgs;
    }
    async getMsgsById(id) {
        const msgId = await this.contactModel.findById(id);
        return msgId;
    }
    async updateMsg(id, contactDto) {
        const upMsg = await this.contactModel.findByIdAndUpdate(id, contactDto);
        return upMsg;
    }
    async deleteMsg(id) {
        const msgToDelete = await this.contactModel.findByIdAndDelete(id);
        return msgToDelete;
    }
};
contactService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("contact")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], contactService);
exports.contactService = contactService;
//# sourceMappingURL=contact.service.js.map