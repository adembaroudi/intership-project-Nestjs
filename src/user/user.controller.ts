import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { UserDto } from "../user/dto/user.dto";
import { userService } from "../user/user.service";

@Controller("user")
export class UserController {
  constructor(private userService: userService) {}
  @Post("/Users")
  async addUser(@Res() res, @Body() userDto: UserDto) {
    const user = await this.userService.addUser(userDto);
    if (user === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "email in use",
      });
    }
    return res.status(HttpStatus.OK).json({
      message: "user added successuly",
      user: user,
    });
  }
  @Get("/Users/:id")
  async getUserById(@Param("id") id: string, @Res() res) {
    const userId = await this.userService.getUserById(id);
    return res.send(userId);
  }
  @Delete("/Users/:id")
  async deleteUser(@Param("id") id: String, @Res() res) {
    const userToDelete = await this.userService.deleteUser(id);
    return res.status(HttpStatus.OK).json({
      message: "user deleted successuly",
      user: userToDelete,
    });
  }
}
