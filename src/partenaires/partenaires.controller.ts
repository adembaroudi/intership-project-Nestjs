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
}
