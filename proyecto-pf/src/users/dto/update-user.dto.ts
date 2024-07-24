import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNumberString, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty({
        description: "el nombre del usuario",
        type: String,
        example: "Pepe2",
        required: false,
    })
    @IsOptional()
    @IsString()
    name: string
    
    @ApiProperty({
        description: "el apellido del usuario",
        type: String,
        example: "Pereyra2",
        required: false,
    })
    @IsOptional()
    @IsString()
    surname: string

    @ApiProperty({
        description: "el numero del usuario",
        type: String,
        example: 3571579804,
        required: false,
    })
    @IsOptional()
    @IsNumberString()
    phone: string

    @ApiProperty({
        description: "el nombre del campo del usuario",
        type: String,
        example: "la miseria",
        required: false,
    })
    @IsOptional()
    @IsString()
    placeName: string


    @ApiProperty({
        description: "el email del usuario",
        type: String,
        example: "pepe2@gmail.com",
        required: false,
        format: "email"
    })
    @IsOptional()
    @IsEmail()
    email: string

}
