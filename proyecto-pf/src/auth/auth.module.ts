import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersRepository } from "src/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Role } from "src/users/entities/roles.entity";




@Module({
    imports: [TypeOrmModule.forFeature([User,Role])],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController]
    
})
export class AuthModule{}