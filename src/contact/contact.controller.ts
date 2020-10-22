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
  @Get("/Contact/:id")
  async getMsgById(@Param("id") id: String) {
    const msgId = await this.contactService.getMsgsById(id);
    return msgId;
  }
  @Put("/Contact/:id")
  async updateMsg(@Param("id") id: String, @Body() contactDto: ContactDto) {
    const upmsg = await this.contactService.updateMsg(id, contactDto);
    return upmsg;
  }
  @Delete("/Contact/:id")
  async deleteMsg(@Param("id") id: String, @Res() res) {
    const deletemsg = await this.contactService.deleteMsg(id);
    return res.status(HttpStatus.OK).json({
      message: "user deleted successuly",
    });
  }
}
