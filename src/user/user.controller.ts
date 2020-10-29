import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { UserDto } from "../user/dto/user.dto";
import { userService } from "../user/user.service";
import * as multer from 'multer';
import * as path from 'path'
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
  @Post('/Users/file')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination : (req,file,cb)=> {  
        cb(null, 'upload/');
      },
      filename:(req,file, cb)=> {
        cb(null, Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.')));
      },
    }),
  }))
async uploadLogoCompany(@Res() res, @UploadedFile() file, @Param('id') id): Promise<any> {
  if ((path.extname(`${file.filename}`) === '.png')||  (path.extname(`${file.filename}`) === '.jpg') || (path.extname(`${file.filename}`) === '.jpeg')) {
    this.userService.logoUserPic(`${file.filename}`, id);
    await res.json(file);
  }
    return { message: 'not an Image' };
  }

  @Get("Users/:getimage")
  getFiles(@Param("getimage") getimage: String, @Res() res) {
    return res.sendFile(getimage, { root: "upload" });
  }
}

