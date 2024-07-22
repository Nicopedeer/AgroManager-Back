import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService {
    constructor(
        private readonly UsersRepository: UsersRepository,
        private readonly JwtService: JwtService
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        const finededUser = await this.UsersRepository.getUserByEmail(createUserDto.email) 
        if (finededUser) {throw new ConflictException("ya existe un usuario con ese correo")}
        if (createUserDto.password !== createUserDto.confirmPassword) {throw new BadRequestException("las contraseñas no coinciden")}

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        return this.UsersRepository.createUser({...createUserDto, password: hashedPassword})
    }

    async signIn(signInDto) {
        const user = await this.UsersRepository.getUserByEmail(signInDto.email)
        if(!user) {throw new BadRequestException("las credenciales son incorrectas1")}
        const confirmPassword: boolean = await bcrypt.compare(signInDto.password, user.password) 
        if (!confirmPassword) {throw new BadRequestException("credenciales incorrectas")} 

        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.roles
        }
        
        const token = this.JwtService.sign(payload)

        return {message: "login exitoso", token}
    }
}