import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersRepository } from './users/users.repository';
import { AuthService } from './auth/auth.service';
import { User } from './users/entities/user.entity';
import { CategoriesRepository } from './categories/categories.repository';

@Injectable()
export class AppService implements OnModuleInit{
  
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private readonly categoriesRepository: CategoriesRepository
  ) {}



  async onModuleInit() {
      await this.usersRepository.preLoadPro()
      await this.categoriesRepository.addCategories()
      console.log("servidor pro levantado con éxito✨✨✨✨")

  }
}