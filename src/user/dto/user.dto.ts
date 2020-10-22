import { IsNotEmpty, IsEmail } from "class-validator";
export class UserDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  Lastname: string;
  @IsNotEmpty()
  Firstname: string;
  @IsNotEmpty()
  Datedenaissance: string;
  @IsNotEmpty()
  numTel: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: String;
}