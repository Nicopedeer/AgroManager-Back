import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { UsersRepository } from './users.repository';
import { ChangePasswordDto } from './dto/change-password.dto';
import { forgotPassworDto } from './dto/forgot-password.dto';
import { forgotPasswordEmailDTO } from 'src/email/dto/forgotPassword.dto';

@Injectable()
export class UsersService {
  
  
  

  constructor(private readonly userRepository: UsersRepository) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto)
  }

  makeUserPremiumMonthly(id: UUID) {
    return this.userRepository.givePremiumMonthly(id)
  }

  makeUserPremiumYearly(id: UUID) {
    return this.userRepository.givePremiumYearly(id)
  }

  freeTrial(id: UUID) {
    return this.userRepository.freeTrial(id)
  }

  getUsers() {
    return this.userRepository.getUsers()
  }

  getUsersPage(page:number, limit: number) {
    return this.userRepository.getUsersPage(page, limit)
  }

  getUserById(id: UUID) {
    return this.userRepository.getUserById(id)
  }

    forgotPasswordEmail(forgotPasswordEmailDTO) {
        return this.userRepository.forgotPasswordEmail(forgotPasswordEmailDTO)
    }

  forgotPassword(forgotPasswordDto: forgotPassworDto) {
    return this.userRepository.forgotPassword(forgotPasswordDto)
  }

  changePasword(id: UUID,changePasswordDto: ChangePasswordDto) {
    return this.userRepository.changePassword(id, changePasswordDto)
  }

  updateUser(id: UUID, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  deleteUser(id: UUID) {
    return this.userRepository.deleteUser(id)
  }

  banUser(id: UUID) {
    return this.userRepository.banUser(id)
  }

  unBanUser(id: UUID) {
    return this.userRepository.unBanUser(id)
  }

  renewtoken(token) {
    return this.userRepository.renewtoken(token)
  }
}
