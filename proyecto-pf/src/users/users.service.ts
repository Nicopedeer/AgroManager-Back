import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { UsersRepository } from './users.repository';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UsersRepository) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto)
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

  changePasword(id: UUID,changePasswordDto: ChangePasswordDto) {
    return this.userRepository.changePassword(id, changePasswordDto)
  }

  updateUser(id: UUID, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  deleteUser(id: UUID) {
    return this.userRepository.deleteUser(id)
  }
}
