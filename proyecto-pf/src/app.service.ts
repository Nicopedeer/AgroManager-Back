import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersRepository } from './users/users.repository';
import { AuthService } from './auth/auth.service';
import { User } from './users/entities/user.entity';
import { CategoriesRepository } from './categories/categories.repository';
import { MeasurementsRepository } from './measurements/measurements.repository';

@Injectable()
export class AppService implements OnModuleInit{
  
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly measurementsRepository: MeasurementsRepository
  ) {}



  async onModuleInit() {
      await this.usersRepository.preLoadPro()
      await this.categoriesRepository.addCategories()
      await this.measurementsRepository.addMeasurements()
      console.log("servidor pro levantado con éxito✨✨✨✨")

  }
}