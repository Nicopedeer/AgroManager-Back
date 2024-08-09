import { IsEmail, IsString } from "class-validator";




export class forgotPasswordEmailDTO {
    
    @IsString()
    email: string
}