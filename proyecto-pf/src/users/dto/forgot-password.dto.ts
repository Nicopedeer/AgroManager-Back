import { IsString, IsStrongPassword } from "class-validator";



export class forgotPassworDto {

    @IsString()
    token: string

    @IsStrongPassword()
    password: string

    @IsStrongPassword()
    confirmPassword: string

}