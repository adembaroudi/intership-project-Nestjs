import { IsNotEmpty, IsEmail } from "class-validator";
export class VoteDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
    choice: String
    @IsNotEmpty()
    nbLike: String
}