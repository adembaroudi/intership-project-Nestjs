import { IsNotEmpty, IsEmail } from 'class-validator'
export class ResetpasswordDto {
     @IsNotEmpty()
    newpassword: String
     @IsNotEmpty()
    confirmpassword: string;
}