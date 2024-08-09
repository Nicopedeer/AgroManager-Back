import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { EmailsService } from './email.service';
import { SendMailOptions } from 'nodemailer';
import { ContactDto } from './dto/contactEmail.dto';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { forgotPasswordEmailDTO } from './dto/forgotPassword.dto';

@Controller('emails')
@ApiTags("emails")
export class EmailsController {
    constructor(private readonly emailsService: EmailsService) {}

    @Post('contact')
    async sendEmail(@Body() contactDto : ContactDto) {
        await this.emailsService.sendContactEmail(contactDto);
        return { message: 'Correo enviado con éxito' };
    }

    @Post("forgotpassword")
    forgotPasswordEmail(@Body() forgotPasswordEmailDTO: forgotPasswordEmailDTO) {
        
    }

}
