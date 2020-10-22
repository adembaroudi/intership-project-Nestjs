import { IsNotEmpty, IsEmail } from "class-validator";
export class ContactDto {
  @IsNotEmpty()
  id: String;
  @IsNotEmpty()
  name: String;
  @IsNotEmpty()
  subject: String;
  @IsNotEmpty()
  @IsEmail()
  email: String;
  @IsNotEmpty()
  contenuMessage: String;
  @IsNotEmpty()
  emailPassword : String;
}
