import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsNumberString, IsString, IsStrongPassword } from "class-validator";


export class CreateUserDto {


    @IsString()
    name: string
    
    @IsString()
    surname: string

    @IsNumberString()
    phone: string

    @IsString()
    placeName: string

    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    @IsStrongPassword()
    confirmPassword: string

    

}
