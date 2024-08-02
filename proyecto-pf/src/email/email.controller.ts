import { Controller, Post, Body } from '@nestjs/common';
import { EmailsService } from './email.service';
import { SendMailOptions } from 'nodemailer';

@Controller('emails')
export class EmailsController {
    constructor(private readonly emailsService: EmailsService) {}

    @Post('send')
    async sendEmail(@Body() body: { to: string, subject: string, text: string }) {
        const mailOptions: SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: body.to,
            subject: body.subject,
            text: body.text
        };

        await this.emailsService.sendEmail(mailOptions);
        return { message: 'Correo enviado con éxito' };
    }


    @Post('register')
    async register(@Body() body: { email: string; username: string }) {
    const { email, username } = body;
    await this.emailsService.sendRegistrationEmail(email, username);
    return { message: 'Registro completado y correo enviado' };
    }
}
