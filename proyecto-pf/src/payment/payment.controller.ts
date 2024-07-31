import { Controller, Get, Param, ParseUUIDPipe, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
import { Response } from 'express';
import mercadopago, { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-2153251236509260-072420-60f2e63794bbe036a72101e58fa5cf86-1917367384' });

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
    @Get("monthly/:id")
    async suscripcionMensual(@Param("id", ParseUUIDPipe) id: UUID) {
        const body = {
            items: [{
                id: '1234', 
                title: "suscripcion mensual agromanager",
                quantity: 1,
                unit_price: 1,
                currency_id: "ARS"
            }],
            back_urls: {
                success: `http://localhost:3001/users/premium/monthly/${id}`,
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
        const body = {
            items: [{
                id: '6789', 
                title: "suscripcion anual agromanager",
                quantity: 1,
                unit_price: 2,
                currency_id: "ARS"
            }],
            back_urls: {
                success: `http://localhost:3001/users/premium/yearly/${id}`,
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
