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
} from "@nestjs/common";
import { UserDto } from "src/user/dto/user.dto";
import { contactService } from "./contact.service";
import { ContactDto } from "./dto/contact.dto";

@Controller("contact")
export class contactController {
  constructor(private contactService: contactService) {}
  @Post("/Contact")
  async addMessage(@Body() ContactDto: ContactDto, @Res() res) {
    const message = await this.contactService.addMessage(ContactDto);
    return res.send(message);
  }
  @Get("/Contact")
  async getAllmsgs() {
    const getAll = await this.contactService.getAllMsgs();
    return getAll;
  }
  @Get("/Contact/:idmsg")
  async getMsgById(@Param("idmsg") idmsg: String) {
    const msgId = await this.contactService.getMsgsById(idmsg);
    return msgId;
  }
  @Put("/Contact/:idmsg")
  async updateMsg(@Param("idmsg") idmsg: String, @Body() contactDto: ContactDto) {
    const upmsg = await this.contactService.updateMsg(idmsg, contactDto);
    return upmsg;
  }
  @Delete("/Contact/:idmsg")
  async deleteMsg(@Param("idmsg") idmsg: String, @Res() res) {
    const deletemsg = await this.contactService.deleteMsg(idmsg);
    return res.status(HttpStatus.OK).json({
      message: "user deleted successuly",
    });
  }
}
