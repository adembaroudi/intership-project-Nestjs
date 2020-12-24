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
      diplome: Boolean;
     @IsNotEmpty()
     online : Boolean;
     @IsNotEmpty()
     resterInforme: Boolean;
}
