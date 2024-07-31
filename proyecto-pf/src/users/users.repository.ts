import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UUID } from "crypto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role, RolesEnum } from "./entities/roles.entity";
import * as bcrypt from "bcrypt"
import { ChangePasswordDto } from "./dto/change-password.dto";


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
      const {password, ...rest} = user 
      return {message: "el usuario ha sido creado con éxito", rest} 
      }
    
      async getUsers() {
        const users = await this.userRepository.find({where: {active: true}, relations: {plots: true, supplies: true, roles: true}})
        return users.map(({password, ...rest}) => rest )
      }

      async getUsersPage(page: number, limit: number) {
        const users = await this.userRepository.find({where: {active: true}, relations: {plots: true, supplies: true, roles: true}})
        let inicio = (page - 1) * limit;
        let fin = inicio + limit
        const userPage = users.slice(inicio, fin)
        return userPage.map(({password, ...rest}) => rest)
      }

      async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email: email, active: true}, relations: {roles: true}})
        return user
      }
    
      async getUserById(id: UUID) {
        const user = await this.userRepository.findOne({where: {id: id}, relations: {plots: true, supplies: true}});
        if(!user){
          throw new NotFoundException(`No se encontro el usuario con id:${id}`)
        }
        const {password, ...rest} = user
        return rest
      }

      async changePassword(id: UUID, changePasswordDto: ChangePasswordDto) {
        const user = await this.userRepository.findOne({where: {id: id, active: true}})
        if (!user) {
            throw new NotFoundException(`No se encontro el usuario con id:${id}`)
        }
        if (changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword) {throw new BadRequestException("las contraseñas no coinciden")}


        const comparation: boolean = await bcrypt.compare(changePasswordDto.oldPassword, changePasswordDto.newPassword)
        if (comparation) {
          throw new BadRequestException(`La contraseña es incorrecta`)
        }
        
        user.password = await bcrypt.hash(changePasswordDto.newPassword, 10)
        await this.userRepository.save(user)

        return {message: "Se ha cambiado con éxito la contraseña del usuario", userId: user.id}
      }
    
      async updateUser(id: UUID, updateUserDto: UpdateUserDto) {
        if (this.getUserByEmail(updateUserDto.email)){
          throw new ConflictException("Ya existe un usuario con ese email")
        }
        const user = await this.userRepository.findOne({where: {id: id, active: true}})
        if (!user) {
          throw new NotFoundException("El usuario no fue encontrado")
        }
        Object.assign(user, updateUserDto)

        const updatedUser = await this.userRepository.save(user)
        delete updatedUser.password
        
        return {message: "El usuario ha sido actualizado con éxito", updatedUser}
      }

      async giveAdmin(id: UUID) {
        const user = await this.userRepository.findOne({where: {id, active: true}})
        if (!user){
          throw new NotFoundException(`No se pudo encontrar el usuario con id:${id}`)
        }
        const adminRole = await this.roleRepository.findOne({where: {name: RolesEnum.ADMIN}})
      if (user.roles.includes(adminRole)){
        throw new ConflictException(`El usuario con id:${id} ya es administrador`)
      }
        user.roles = [...user.roles, adminRole] 
        await this.userRepository.save(user)
        return {message: "El usuario ahora es admiistrador", user}
      }
    
      async deleteUser(id: UUID) {
        const user = await this.userRepository.findOne({where: {id: id, active: true}})
        if (!user){
          throw new NotFoundException(`No se encontro el usuario con id:${id}`)
        }
        user.active = false 
        delete user.email
        await this.userRepository.save(user)
        return `El usuario con el id ${user.id} fue eliminado correctamente`;
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


