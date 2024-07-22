import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";




@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly AuthService: AuthService
    ) {}
    

    @Post("signup")
    @HttpCode(201)
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.AuthService.signUp(createUserDto)
    }

    @Post("signin")
    signIn(@Body() signInDto) {
        return this.AuthService.signIn(signInDto)
    }
}