import { IsNotEmpty, IsEmail } from "class-validator";
export class BlogDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  Title: string;
  @IsNotEmpty()
  Date: string;
  @IsNotEmpty()
  Auteur: string;
  @IsNotEmpty()
  Contenue: string;
  comment : string;
}