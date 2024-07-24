import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class SignInDto {

    @ApiProperty({
        description: "el email del usuario",
        type: String,
        example: "pepe@gmail.com",
        required: false,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: "la contraseña del usuario",
        type: String,
        example: "Pepe123**123",
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    password: string


}