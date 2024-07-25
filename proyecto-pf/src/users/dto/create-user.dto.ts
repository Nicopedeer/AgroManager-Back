import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsNumberString, IsString, IsStrongPassword } from "class-validator";


export class CreateUserDto {


    @ApiProperty({
        description: "el nombre del usuario",
        type: String,
        example: "Pepe",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    name: string
    
    @ApiProperty({
        description: "el apellido del usuario",
        type: String,
        example: "Pereyra",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    surname: string

    @ApiProperty({
        description: "el email del usuario",
        type: String,
        format: "email",
        example: "pepe@gmail.com",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: "la constraseña del usuario",
        type: String,
        example: "Pepe123**123",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @ApiProperty({
        description: "confirmación de la contraseña",
        type: String,
        example: "Pepe123**123",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsStrongPassword()
    confirmPassword: string

    

}
