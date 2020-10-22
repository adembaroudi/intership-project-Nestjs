import { IsNotEmpty, IsEmail } from 'class-validator'
export class trainingRegistrationDto {
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
     password: string;
     @IsNotEmpty()
      diplome: Boolean;
     @IsNotEmpty()
     online : Boolean;
     @IsNotEmpty()
     resterInforme: Boolean;
}
