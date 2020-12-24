import { IsNotEmpty, IsEmail } from "class-validator";
export class companyRegDto {
  @IsNotEmpty()
  companyName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  numTel: string;
  @IsNotEmpty()
  sujet: string;
  @IsNotEmpty()
  service: string;
}
