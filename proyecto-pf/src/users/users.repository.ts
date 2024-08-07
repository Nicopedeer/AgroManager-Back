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
import { isWithinSevenDays } from "src/utils/dateCompare";
import { EmailsService } from "src/email/email.service";


@Injectable()
export class UsersRepository {
  

    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private readonly emailService: EmailsService
){}

    async createUser(createUserDto: CreateUserDto) {
      const user = this.userRepository.create(createUserDto)
      const userRole = await this.roleRepository.findOne({where: {name: RolesEnum.USER}})

      user.roles = [userRole]

      this.emailService.sendRegistrationEmail(user.email, (user.name + " " + user.surname))
      await this.userRepository.save(user);
      const {password, ...rest} = user 


      return {message: "el usuario ha sido creado con éxito", rest} 
      }

      async createUserGoogle(googleUser) {
        const nameArray = googleUser.name.split(" ")
        const name = nameArray[0]
        let surname: null | string = null
        if (nameArray.length > 1) {
          surname = nameArray[nameArray.length - 1]
        }

        const user = this.userRepository.create({name: name, email: googleUser.email, googleId: googleUser.id, surname: surname})
        const userRole = await this.roleRepository.findOne({where: {name: RolesEnum.USER}})
  
        user.roles = [userRole]
  
        if (user.surname) {this.emailService.sendRegistrationEmail(user.email, (user.name + " " + user.surname))}
        else {
          this.emailService.sendRegistrationEmail(user.email, (user.name))
        }
        
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
        const user = await this.userRepository.findOne({where: {id: id}, relations: {plots: true, supplies: true, roles: true}});
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
        if (updateUserDto.email) {
          const emailFound = await this.userRepository.findOne({where: {email: updateUserDto.email, active: true}})
          console.log(emailFound)
          if (emailFound){
            throw new ConflictException("Ya existe un usuario con ese email")
          }
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

      async givePremiumMonthly(userId: UUID) {
        //da premium por 1 mes, hasta que adaptemos la lógica 
        const premiumRole = await this.roleRepository.findOne({where: {name: RolesEnum.PREMIUM}})
        const user = await this.userRepository.findOne({where: {id: userId, active: true}, relations: {roles: true}})
        if (!user) {throw new NotFoundException("el usuario no fue encontrado")}
      

        const expDate = new Date()

        expDate.setMonth(expDate.getMonth() + 1)

        user.roles = [...user.roles, premiumRole]
        user.premiumExpiration = expDate

        this.emailService.paymentCheck(user.email, user.name + " " + user.surname)
        await this.userRepository.save(user)

        return "el usuario ahora es premium"
      }

      async givePremiumYearly(userId: UUID) {
        //da premium por 1 mes, hasta que adaptemos la lógica 
        const premiumRole = await this.roleRepository.findOne({where: {name: RolesEnum.PREMIUM}})
        const user = await this.userRepository.findOne({where: {id: userId, active: true}, relations: {roles: true}})
        if (!user) {throw new NotFoundException("el usuario no fue encontrado")}
      

        const expDate = new Date()

        expDate.setFullYear(expDate.getFullYear() + 1)

        user.roles = [...user.roles, premiumRole]
        user.premiumExpiration = expDate

        this.emailService.paymentCheck(user.email, user.name + " " + user.surname)
        await this.userRepository.save(user)

        return "el usuario ahora es premium"
      }


      async freeTrial(userId: UUID) {

        const premiumRole = await this.roleRepository.findOne({where: {name: RolesEnum.PREMIUM}})
        const user = await this.userRepository.findOne({where: {id: userId, active: true}, relations: {roles: true}})
        if (!user) {throw new NotFoundException("el usuario no fue encontrado")}
        if (user.freeTrialUsed === true) {throw new ConflictException("el usuario ya usó su prueba gratuita")}
      

        const expDate = new Date()

        expDate.setMonth(expDate.getMonth() + 1)

        user.roles = [...user.roles, premiumRole]
        user.premiumExpiration = expDate

        user.freeTrialUsed = true

        this.emailService.paymentCheck(user.email, user.name + " " + user.surname)
        await this.userRepository.save(user)

        return "el usuario ahora es premium"
      }

      async giveAdmin(id: UUID) {
        const user = await this.userRepository.findOne({where: {id, active: true}})

        const premiumRole = await this.roleRepository.findOne({where: {name: RolesEnum.PREMIUM}})
        if (!user) {throw new NotFoundException("No se pudo encontrar el usuario")}

        if (!user){
          throw new NotFoundException(`No se pudo encontrar el usuario con id:${id}`)
        }
        const adminRole = await this.roleRepository.findOne({where: {name: RolesEnum.ADMIN}})
      if (user.roles.includes(adminRole)){
        throw new ConflictException(`El usuario con id:${id} ya es administrador`)
      }
       user.roles = [...user.roles, adminRole, premiumRole]

        await this.userRepository.save(user)
        return {message: "El usuario ahora es admiistrador", user}
      }
    
      async banUser(id: UUID) {
        const user = await this.userRepository.findOne({where: {id}, relations: {roles: true}})
        if (!user) {throw new NotFoundException()}
        if (user.roles.some(role => role.name === RolesEnum.BANNED)) {
          throw new BadRequestException("el usuario ya se econtraba baneado")
        }
      
        const bannedRole = await this.roleRepository.findOne({where: {name: RolesEnum.BANNED}})
        user.roles.push(bannedRole)
        await this.userRepository.save(user)

        return `El usuario ${user.name} con el id ${user.id} ha sido basneado`
      }

      async unBanUser(id: UUID) {
        const user = await this.userRepository.findOne({where: {id}, relations: {roles: true}})
        if (!user) {throw new NotFoundException()}

        const bannedRole = await this.roleRepository.findOne({where: {name: RolesEnum.BANNED}})
        
        const indexBannedRole = user.roles.findIndex(role => role.name === bannedRole.name);
            if (indexBannedRole === -1) {throw new BadRequestException("el usuario no se encontraba baneado")}
            else {
              user.roles.splice(indexBannedRole, 1);
              console.log("El usuario ha sido desbaneado :V")
              await this.userRepository.save(user)
            }

            return `el usuario ${user.name} con el id ${user.id} ha sido desbaneado`
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
      const premiumRole = await this.roleRepository.findOne({where: {name: RolesEnum.PREMIUM}})
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
        roles: [userRole, premiumRole,adminRole]
      }

      //const expDate = new Date("2070-07-27")
      const expDate = new Date("2090-08-08T16:07:36.339Z")
      user.premiumExpiration = expDate
      adminUser.premiumExpiration = expDate

      
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

      async premiumCheck() {
        const premiumRole = await this.roleRepository.findOne({where: {name: RolesEnum.PREMIUM}})
        const users = await this.userRepository.find({where: {active: true}, relations: {roles: true}})
        const todayDate = new Date()

        for (const user of users) {
          if (user.roles.some(role => role.name === premiumRole.name) && user.premiumExpiration < todayDate) {
              const indexPremium = user.roles.findIndex(role => role.name === premiumRole.name);
            if (indexPremium !== -1) {
              user.roles.splice(indexPremium, 1);
              this.emailService.expiredSuscription(user.email, user.name + " " + user.surname)
            }
  
              await this.userRepository.save(user);
          }
        }
      }

      async notifyUsers() {
        const users = await this.userRepository.find({where: {active: true}, relations: {roles: true}})

        for (const user of users) {
          if (user.changeToday === false) {console.log("aca va el email sisi entendes")}

          user.changeToday === false
          await this.userRepository.save(user)
        }
      }

    async notifyIncomingExpiration() {
      const premiumRole = await this.roleRepository.findOne({where: {name: RolesEnum.PREMIUM}})
        const users = await this.userRepository.find({where: {active: true}, relations: {roles: true}})
        const todayDate = new Date()

        for (const user of users) {
          if (user.roles.some(role => role.name === premiumRole.name)) {
            const expDate = user.premiumExpiration
            const comparation = isWithinSevenDays(expDate, todayDate)
            if (comparation) {
              this.emailService.expiredSevenDays(user.email, user.name + " " + user.surname)
            }
          }
    }
  }
  
  async resetChangeToday() {
    const users = await this.userRepository.find({where: {active: true}, relations: {roles: true}})

        for (const user of users) {
          user.changeToday === false
          await this.userRepository.save(user)
        } 
  }

  async updateChangeToday(id: string){
    const user = await this.userRepository.findOne({where:{id: id}})
    user.changeToday = true
    await this.userRepository.save(user)
  }
  
}


