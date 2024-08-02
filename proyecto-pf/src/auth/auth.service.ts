import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { UUID } from "crypto";
import { SignInDto } from "./dto/signIn.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly UsersRepository: UsersRepository,
        private readonly JwtService: JwtService
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        const finededUser = await this.UsersRepository.getUserByEmail(createUserDto.email) 
        if (finededUser){
            throw new ConflictException(`Ya existe un usuario con el correo: ${createUserDto.email}`)}
        if (createUserDto.password !== createUserDto.confirmPassword){
            throw new BadRequestException("Las contraseñas no coinciden")
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        return this.UsersRepository.createUser({...createUserDto, password: hashedPassword})
    }

    async signIn(signInDto: SignInDto) {
        const userFound = await this.UsersRepository.getUserByEmail(signInDto.email)
        if(!userFound){
            throw new BadRequestException("Credenciales incorrectas")
        }
        const confirmPassword: boolean = await bcrypt.compare(signInDto.password, userFound.password) 
        if (!confirmPassword){
            throw new BadRequestException("Credenciales incorrectas")
        } 

        const payload = {
            sub: userFound.id,
            email: userFound.email,
            roles: userFound.roles
        }

        const {password, ...user} = userFound
        
        const token = this.JwtService.sign(payload)

        return { message: 'Sesion iniciada correctamente', token, isLoggin: true, user };
    }

    giveAdmin(id: UUID){
        return this.UsersRepository.giveAdmin(id)
    }
}