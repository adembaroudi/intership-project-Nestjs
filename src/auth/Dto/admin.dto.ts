import { IsNotEmpty, IsEmail } from "class-validator";

export class registerAdminDto {
    @IsNotEmpty()
    @IsEmail()
    email : string;
    @IsNotEmpty()
    password:string;
}