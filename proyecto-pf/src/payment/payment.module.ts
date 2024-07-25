import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
// import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';


@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PaymentController],
  providers: [PaymentRepository],
})
export class PaymentModule {}


// PaymentService