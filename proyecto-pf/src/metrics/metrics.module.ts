import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/users/entities/roles.entity';
import { UsersRepository } from 'src/users/users.repository';
import { EmailsService } from 'src/email/email.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [MetricsController],
  providers: [MetricsService, UsersRepository, EmailsService],
})
export class MetricsModule {}
