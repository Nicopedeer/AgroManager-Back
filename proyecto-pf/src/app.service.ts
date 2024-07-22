import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersRepository } from './users/users.repository';
import { AuthService } from './auth/auth.service';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService implements OnModuleInit{
  
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService
  ) {}



  async onModuleInit() {
      await this.usersRepository.preLoadPro()
      console.log("servidor pro levantado con éxito✨✨✨✨")  
  }
}