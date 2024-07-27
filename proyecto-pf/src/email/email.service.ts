import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";


@Injectable()
export class EmailsService {
private transporter: nodemailer.Transporter<SentMessageInfo>;

constructor() {
    this.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587, 
    secure: false, 
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
    });
}
}

