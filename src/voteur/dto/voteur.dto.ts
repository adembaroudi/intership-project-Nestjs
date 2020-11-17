import { IsNotEmpty, IsEmail } from "class-validator";
export class VoteurDto {
  @IsNotEmpty()
  id: String;
  @IsNotEmpty()
  firstname: String;
  @IsNotEmpty()
  lastname: String;
  @IsNotEmpty()
  @IsEmail()
  email: String;

}
