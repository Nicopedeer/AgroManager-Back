import * as nodemailer from "nodemailer";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 465, 
    secure: false, 
    auth: {
        user: 'valentinagromanager@gmail.com',
        pass: 'lsaneffpnvndtixd'
    }
});

console.log("hola")

const emailSent = {
    from: 'valentinagromanager@gmail.com', 
    to: "valentin.simon731@gmail.com",
    subject: "HOLA",
    text: "hola, anda bien",
};

transporter.sendMail(emailSent, (error, info) => {
    if (error) {
        console.error("Error al enviar el email:", error);
    } else {
        console.log("Email enviado:", info.response);
    }
});
