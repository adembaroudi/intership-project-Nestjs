import { IsNotEmpty, IsEmail } from 'class-validator'
export class serviceRegistrationDto {
    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    lastname: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
     @IsNotEmpty()
     numTel: string;
     @IsNotEmpty()
     cv: string;
     @IsNotEmpty()
      sujet: string;
     @IsNotEmpty()
     service : string;
}
