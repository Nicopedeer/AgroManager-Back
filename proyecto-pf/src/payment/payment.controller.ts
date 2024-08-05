import { ConflictException, Controller, Get, Param, ParseUUIDPipe, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
import { Response } from 'express';
import mercadopago, { MercadoPagoConfig, Preference } from 'mercadopago';
import { UsersRepository } from "src/users/users.repository";

const PORT = process.env.APP_port
const PORT_FRONT = process.env.app_FRONT_port
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-2153251236509260-072420-60f2e63794bbe036a72101e58fa5cf86-1917367384' });

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
    constructor(private readonly userRepository: UsersRepository) {}


    @Get("monthly/:id")
    async suscripcionMensual(@Param("id", ParseUUIDPipe) id: UUID) {
        if ((await this.userRepository.getUserById(id)).roles.some((role)=> role.name === "premium")) {
            throw new ConflictException("el usuario ya es premium")
        }

        const body = {
            items: [{
                id: '1234', 
                title: "suscripcion mensual agromanager",
                quantity: 1,
                unit_price: 1,
                currency_id: "ARS"
            }],
            back_urls: {
                success: `http://localhost:${PORT_FRONT}/subscriptions/accept-subscription`,
                failure: "https://music.youtube.com/watch?v=jtXDIfWjMkQ",
                pending: "https://www.youtube.com/watch?v=vEXwN9-tKcs",
            },
            auto_return: "approved"
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        return result.init_point;
    }

    @Get("yearly/:id")
    async suscripcionAnual(@Param("id", ParseUUIDPipe) id: UUID) {
        if ((await this.userRepository.getUserById(id)).roles.some((role)=> role.name === "premium")) {
            throw new ConflictException("el usuario ya es premium")}

        const body = {
            items: [{
                id: '6789', 
                title: "suscripcion anual agromanager",
                quantity: 1,
                unit_price: 2,
                currency_id: "ARS"
            }],
            back_urls: {
                success: `http://localhost:${PORT_FRONT}/subscriptions/accept-subscription`,
                failure: "https://music.youtube.com/watch?v=jtXDIfWjMkQ",
                pending: "https://www.youtube.com/watch?v=vEXwN9-tKcs",
            },
            auto_return: "approved"
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        return result.init_point;
    }
}
