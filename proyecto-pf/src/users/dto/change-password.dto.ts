import { IsString, IsStrongPassword } from "class-validator";




export class ChangePasswordDto {

    @IsString()
    oldPassword: string

    @IsStrongPassword()
    newPassword: string 

    @IsString()
    confirmNewPassword: string


}