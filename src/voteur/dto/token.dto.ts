import { IsNotEmpty, IsEmail } from "class-validator";
export class TokenDto {
  @IsNotEmpty()
  id: String;
  @IsNotEmpty()
  @IsEmail()
  email: String
}