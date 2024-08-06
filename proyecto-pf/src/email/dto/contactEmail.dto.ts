import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ContactDto{
     @ApiProperty({
        description: "El nombre del usuario",
        type: String,
        required: true, 
        example: "Juan Gomez",
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        description: "El email del usuario",
        type: String,
        example: "nicopedernera@hotmail.com.ar",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: "El mensaje del usuario",
        type: String,
        example:"No puedo agregar un insumo",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    message: string
}

