import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { config as dotenvConfig } from "dotenv";
import { SendMailOptions, SentMessageInfo } from "nodemailer";

dotenvConfig({ path: ".env.development" });


//Templates
import { registerEmail } from "./templates/registerEmail.template";
import { expiredSuscription } from "./templates/expiredSuscription";
import { expiredSevenDays } from "./templates/expiredSevenDays";
import { paymentCheck } from "./templates/paymentCheck";
import { rememberEmail } from "./templates/rememberEmail";


@Injectable()
export class EmailsService {
    private transporter: nodemailer.Transporter<SentMessageInfo>;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
        user: 'valentinagromanager@gmail.com',
        pass: 'lsaneffpnvndtixd'
            }
        });
    }

    public async sendEmail(mailOptions: SendMailOptions): Promise<void> {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Correo enviado: %s", info.messageId);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    }

    async sendRegistrationEmail(email: string, username: string): Promise<void> {
        const mailOptions = {
        from: 'valentinagromanager@gmail.com',
        to: email,
        subject: "Registro existoso en AgroManager",
        html: registerEmail(username)
        };
        await this.sendEmail(mailOptions);
    
    }

    async expiredSuscription(email: string, username: string): Promise<void> {
        const mailOptions = {
        from: 'valentinagromanager@gmail.com',
        to: email,
        subject: "Su suscripcion ha caducado",
        html: expiredSuscription(username)
        };
        await this.sendEmail(mailOptions);
    
    }

    async expiredSevenDays(email: string, username: string): Promise<void> {
        const mailOptions = {
        from: 'valentinagromanager@gmail.com',
        to: email,
        subject: "Su suscripcion acaba pronto",
        html: expiredSevenDays(username)
        };
        await this.sendEmail(mailOptions);
    
    }


    async paymentCheck(email: string, username: string): Promise<void> {
        const mailOptions = {
        from: 'valentinagromanager@gmail.com',
        to: email,
        subject: "Su suscripcion se ha confirmado",
        html: paymentCheck(username)
        };
        await this.sendEmail(mailOptions);
    
    }

    async rememberEmail(email: string, username: string): Promise<void> {
        const mailOptions = {
        from: 'valentinagromanager@gmail.com',
        to: email,
        subject: "No abandones tus lotes!",
        html: rememberEmail(username)
        };
        await this.sendEmail(mailOptions);
    
    }
}


