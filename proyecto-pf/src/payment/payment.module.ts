import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
// import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { UsersRepository } from 'src/users/users.repository';
import { Role } from 'src/users/entities/roles.entity';
import { User } from 'src/users/entities/user.entity';
import { EmailsService } from 'src/email/email.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [PaymentController],
  providers: [PaymentRepository, UsersRepository, EmailsService],
})
export class PaymentModule {}


// PaymentService