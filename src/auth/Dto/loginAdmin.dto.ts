import { IsNotEmpty, IsEmail } from 'class-validator'
export class LogintDto {
     @IsNotEmpty()
    password: string;
    @IsEmail()
     @IsNotEmpty()
     email: string;
}