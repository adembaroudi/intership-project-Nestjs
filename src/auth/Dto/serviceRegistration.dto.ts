import { IsNotEmpty, IsEmail } from 'class-validator'
export class serviceRegistrationDto {
    @IsNotEmpty()
    Firstname: string;
    @IsNotEmpty()
    Lastname: string;
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
