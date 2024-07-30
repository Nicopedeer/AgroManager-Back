import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersRepository } from './users/users.repository';
import { AuthService } from './auth/auth.service';
import { User } from './users/entities/user.entity';
import { CategoriesRepository } from './categories/categories.repository';
import { MeasurementsRepository } from './measurements/measurements.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { every } from 'rxjs';

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
      await this.usersRepository.premiumCheck()
      console.log("servidor pro levantado con éxito✨✨✨✨")

  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async premiumCheck() {
    await this.usersRepository.premiumCheck()
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async notifyUser() {
    this.usersRepository.notifyUsers()
  }

  

  @Cron(CronExpression.EVERY_HOUR)
  funcionMuyImportanteNoBorrarPorfis(){
    //Si esta función es borrada, todo lo que tenga que ver con fechas y horas dejara de funcionar, no eliminar porfavor. muchas gracias
    console.log("uwu")
  }
}