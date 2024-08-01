import { Module } from '@nestjs/common';
import { EmailsService } from './email.service';
import { EmailsController } from './email.controller'; 

@Module({
    imports: [],
    controllers: [EmailsController],
    providers: [EmailsService],
})
export class EmailsModule {}
