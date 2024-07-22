import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UUID } from "crypto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role, RolesEnum } from "./entities/roles.entity";
import * as bcrypt from "bcrypt"


@Injectable()
export class UsersRepository {

    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>
){}

    async createUser(createUserDto: CreateUserDto) {
      const user = this.userRepository.create(createUserDto)
      const userRole = await this.roleRepository.findOne({where: {name: RolesEnum.USER}})

      user.roles = [userRole]

      await this.userRepository.save(user);
      return "usuario creado con éxito" 
      }
    
      getUsers() {
        return `This action returns all users`;
      }

      getUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email: email, active: true}, relations: ["roles"]})
      }
    
      getUserById(id: UUID) {
        return `This action returns a #${id} user`;
      }
    
      updateUser(id: UUID, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
      }
    
      deleteUser(id: UUID) {
        return `This action removes a #${id} user`;
      }

      async preloadRoles() {
        for (const [key, value] of Object.entries(RolesEnum)) {
          const findedRole = await this.roleRepository.findOne({ where: { name: value } });
          if (!findedRole) {
            await this.roleRepository.save({ name: value });
          }
        }
      }

    async preLoadUsers() {
      const userRole = await this.roleRepository.findOne({where: {name: RolesEnum.USER}})
      const adminRole = await this.roleRepository.findOne({where: {name: RolesEnum.ADMIN}})
      
      const user: Partial<User> = {
        name: "user",
        surname: "normal",
        phone: "3571579804",
        placeName: "userPlace",
        email: process.env.USER_email,
        password: await bcrypt.hash(process.env.USER_password, 10),
        roles: [userRole]
      }

      const adminUser: Partial<User> = {
        name: "admin",
        surname: "pro",
        placeName: "adminPlace",
        phone: "3571579804",
        email: process.env.ADMIN_email,
        password: await bcrypt.hash(process.env.ADMIN_password, 10),
        roles: [userRole, adminRole]
      }

      
      if (!await this.userRepository.findOne({where: {name: "user"}})) {
        await this.userRepository.save(user)
      }
      if (!await this.userRepository.findOne({where: {name: "admin"}})) {
      await this.userRepository.save(adminUser)
      }
    }

    async preLoadPro() {
      await this.preloadRoles();
      await this.preLoadUsers()

    }
}


