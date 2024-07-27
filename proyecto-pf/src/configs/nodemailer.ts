import { config as dotenvConfig } from 'dotenv';

import nodemailer from "nodemailer"

dotenvConfig({ path: '.env' });

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

transporter.verify().then(() => {
    console.log("Listo para enviar emails");    
});