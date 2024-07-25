import { Body, Controller, HttpCode, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UUID } from "crypto";
import { signUpDecorator } from "./auth.decorators";




@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly AuthService: AuthService
    ) {}
    

    @Post("signup")
    @signUpDecorator()
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.AuthService.signUp(createUserDto)
    }

    @Post("signin")
    signIn(@Body() signInDto) {
        return this.AuthService.signIn(signInDto)
    }

    @Put("id")
    giveAdmin(@Param("id", ParseUUIDPipe) id: UUID){
        return this.AuthService.giveAdmin(id)
    }
}