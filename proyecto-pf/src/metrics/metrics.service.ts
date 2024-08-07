import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RolesEnum } from 'src/users/entities/roles.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { Repository } from 'typeorm';

@Injectable()
export class MetricsService {
  
  
    

    constructor(
        private readonly userRepository: UsersRepository,
        @InjectRepository(User) private DBuserRepository: Repository<User>,
        @InjectRepository(Role) private DBRoleRepository: Repository<Role>

    ) {}



  async getActiveMetrics() {
    const users = await this.DBuserRepository.find()
    const userNumber: number = await this.DBuserRepository.count()
    const activeUsersNumber = users.filter(user => user.active === true && !user.roles.some(role => role.name === RolesEnum.BANNED)).length
    const inActiveUserNumber: number = await this.DBuserRepository.count({where: {active: false}})
    const bannedUsersNumber = users.filter(user => user.roles.some(role => role.name === RolesEnum.BANNED)).length




    const activePercent = activeUsersNumber * 100 / userNumber
    const inActivePercent = inActiveUserNumber * 100 / userNumber
    const bannedPercent =  bannedUsersNumber * 100 / userNumber



    return {message: "metricas de usuarios", numbers: {totalUsers: users, activeUsers: activeUsersNumber, inActiveUsers: inActiveUserNumber, bannedUsers: bannedUsersNumber}, percents: {activePercent, inActivePercent, bannedPercent}}
  }

  async getMembershipMetrics() {
    const users: number = await this.DBuserRepository.count()
    const premiumRole = await this.DBRoleRepository.findOne({where: {name: RolesEnum.PREMIUM}})

    const premiumUsers: number = await this.DBuserRepository.count({where: {active: true, roles: premiumRole}, relations: {roles: true}})

    const premiumUsersPercent: number =  premiumUsers * 100 / users
    const noPremiumUsersPercent: number = (users - premiumUsers) * 100 / users

    return {message: "Metricas de membresias de usuario", numbers: {total: users, premiumUsers: premiumUsers, noPremiumUsers: users - premiumUsers},Porcents: {premiumUsersPercent, noPremiumUsersPercent}}
  }
  
  async userUseToday() {
    const users = await this.DBuserRepository.count({where: {active: true}})
    const usersUse = await this.DBuserRepository.count({where: {active: true, changeToday: true}})

    const usePercent: number = usersUse * 100 / users
    const noUsePercent: number = (users - usePercent) * 100 / users

    return {message: "metricas de uso de usuarios", numbers: {totalUsers: users ,use: usersUse, noUse: users- usersUse}, percents: {use: usePercent, noUse: noUsePercent}}
  }
  }
