import { IsNotEmpty, IsEmail } from "class-validator";
export class VoteurDto {
  @IsNotEmpty()
  id: String;
  @IsNotEmpty()
  @IsEmail()
  email: String;

}
