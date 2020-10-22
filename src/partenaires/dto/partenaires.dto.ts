import { IsNotEmpty } from "class-validator";
export class PartenairesDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  nomPartenaire: String;
  @IsNotEmpty()
  Logo: String;
}
