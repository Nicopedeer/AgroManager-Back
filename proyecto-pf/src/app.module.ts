import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './configs/typeOrm.config';
import { UsersModule } from './users/users.module';
import { Role } from './users/entities/roles.entity';
import { User } from './users/entities/user.entity';
import { UsersRepository } from './users/users.repository';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PaymentModule } from './payment/payment.module';
import { AuthService } from './auth/auth.service';
import { Labors } from './entities/labors.entity';
import { Categories } from './entities/categories.entity';
import { Measurements } from './entities/measurements.entity';
import { Plots } from './entities/plots.entity';
import { Supplies } from './entities/supplies.entity';
import { FileUploadModule } from './fileUpload/fileUpload.module';
import { CategoriesRepository } from './categories/categories.repository';
import { CategoriesModule } from './categories/categories.module';
import { PlotsModule } from './plots/plots.module';
import { PlotsRepository } from './plots/plots.repository';
import { MeasurementsRepository } from './measurements/measurements.repository';
import { SuppliesRepository } from './supplies/supplies.repository';
import SuppliesApplied from './entities/suppliesApplied.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SuppliesModule } from './supplies/supplies.module';
import { MeasurementsModule } from './measurements/measurements.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get("typeorm"),
    }),
    TypeOrmModule.forFeature([Role, User, Labors, Categories, Measurements, Plots, Supplies, SuppliesApplied]),
    JwtModule.register({
      global: true,
      signOptions:{expiresIn:"1d"},
      secret: process.env.JWT_SECRET
    }),
    UsersModule,
    FileUploadModule,
    AuthModule,
    CategoriesModule,
    PlotsModule,
    PaymentModule,
    MeasurementsModule,
    SuppliesModule,
    ScheduleModule.forRoot()

  ],
  controllers: [],
  providers: [AppService, UsersRepository, AuthService, CategoriesRepository, PlotsRepository,MeasurementsRepository, SuppliesRepository],
})
export class AppModule {}

