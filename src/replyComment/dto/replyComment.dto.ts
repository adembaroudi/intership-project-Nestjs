import { IsNotEmpty, IsEmail } from "class-validator";
export class replyCommentDto {
  @IsNotEmpty()
  id: String;
  @IsNotEmpty()
  name: String;
  @IsNotEmpty()
  date: String;
  @IsNotEmpty()
  contenue: String;
  @IsNotEmpty()
  @IsEmail()
  email: String;
}
