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
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import * as path from "path";
import { PartenairesDto } from "./dto/partenaires.dto";
import { partenairesServices } from "./partenaires.service";

@Controller("partenaires")
export class partenairesController {
  constructor(private partService: partenairesServices) {}
  @Post("addPartenaire")
  async addPartenaire(@Body() partDto: PartenairesDto, @Res() res) {
    const addPartenaire = await this.partService.addPartenaire(partDto);
    return res.status(HttpStatus.OK).json({
      message: "partenaire added successuly",
      added: addPartenaire,
    });
  }
  @Get("getall")
  async getAllPartenaires() {
    const getAll = await this.partService.getAllPartenaires();
    return getAll;
  }
  @Get("getPartenaire/:id")
  async getPartenaire(@Param("id") id: String) {
    const getOne = await this.partService.getPartenaireById(id);
    return getOne;
  }
  @Put("updatepartenaire/:id")
  async updatepartenaire(
    @Param("id") id: String,
    @Res() res,
    @Body() partDto: PartenairesDto
  ) {
    const upOne = await this.partService.updatePartenaire(id, partDto);
    return res.status(HttpStatus.OK).json({
      message: "partenaire updated successfully",
      part: upOne,
    });
  }
  @Delete("deleteone/:id")
  async deletePartenaire(@Param("id") id: String, @Res() res) {
    const deleteOne = await this.partService.deletePartenaire(id);
    return res.status(HttpStatus.OK).json({
      message: "partenaire deleted successfully",
    });
  }
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "upload/");
        },
        filename: (req, file, cb) => {
          cb(
            null,
            Date.now() +
            file.originalname.slice(file.originalname.lastIndexOf("."))
            );
          },
        }),
      })
      )
      @Put("file/:id")
      async uploadLogoPartenaire(
    @Res() res,
    @UploadedFile() file,
    @Param("id") id
  ): Promise<any> {
    if (
      path.extname(`${file.filename}`) === ".png" ||
      path.extname(`${file.filename}`) === ".jpg" ||
      path.extname(`${file.filename}`) === ".JPG" ||
      path.extname(`${file.filename}`) === ".jpeg"
    ) {
      this.partService.logoPartenaire(`${file.filename}`, id);
      await res.json(file);
    }
    return { message: "not an Image" };
  }

  @Get("getPartenaireLogo/:id")
  async getFiles(@Param("id") id: String, @Res() res) {
   const getLogo= await this.partService.getLogo(id);
    return res.sendFile(getLogo, { root: "upload" });
  }
}
