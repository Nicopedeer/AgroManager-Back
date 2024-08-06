import { Module } from '@nestjs/common';
import { EmailsService } from './email.service';
import { EmailsController } from './email.controller'; 
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/users/entities/roles.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [EmailsController],
    providers: [EmailsService, UsersRepository],
})
export class EmailsModule {}
