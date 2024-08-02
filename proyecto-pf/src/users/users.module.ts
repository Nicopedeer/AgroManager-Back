import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/roles.entity';
import { UsersRepository } from './users.repository';
import { AuthService } from 'src/auth/auth.service';
import { EmailsService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService, EmailsService],
})
export class UsersModule {}
