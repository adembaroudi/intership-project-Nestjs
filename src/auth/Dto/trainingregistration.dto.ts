import { IsNotEmpty, IsEmail } from 'class-validator'
export class trainingRegistrationDto {
    @IsNotEmpty()
    lastname: string;
    @IsNotEmpty()
    firstname: string;
     @IsNotEmpty()
     numTel: string;
     @IsNotEmpty()
     @IsEmail()
     email: string;
     @IsNotEmpty()
      diplome: string;
     @IsNotEmpty()
     online : string;
     @IsNotEmpty()
     typePresence: string;
     @IsNotEmpty()
     programme : string;
}
