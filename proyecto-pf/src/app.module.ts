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
import { AuthService } from './auth/auth.service';
import { Labors } from './entities/labors.entity';
import { Categories } from './entities/categories.entity';
import { Measurements } from './entities/measurements.entity';
import { Plots } from './entities/plots.entity';
import { Supplies } from './entities/supplies.entity';
import { FileUploadModule } from './fileUpload/fileUpload.module';
import { CategoriesRepository } from './categories/categories.repository';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get("typeorm"),
    }),
    TypeOrmModule.forFeature([Role, User, Labors, Categories, Measurements, Plots, Supplies]),
    JwtModule.register({
      global: true,
      signOptions:{expiresIn:"1d"},
      secret: process.env.JWT_SECRET
    }),
    UsersModule,
    FileUploadModule,
    AuthModule,
    CategoriesModule

  ],
  controllers: [],
  providers: [AppService, UsersRepository, AuthService, CategoriesRepository],
})
export class AppModule {}
