import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNumberString, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    name: string
    
    @IsOptional()
    @IsString()
    surname: string

    @IsOptional()
    @IsNumberString()
    phone: string

    @IsOptional()
    @IsString()
    placeName: string

    @IsOptional()
    @IsEmail()
    email: string

}
