import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UUID } from "crypto";
// SDK de Mercado Pago
import mercadopago, { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-2153251236509260-072420-60f2e63794bbe036a72101e58fa5cf86-1917367384' });

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
    @Get("create-order/:id")
    async createOrder(@Param("id", ParseUUIDPipe) id: UUID) {
        const body = {
            items: [{
                id: '1234', 
                title: "subTest",
                quantity: 1,
                unit_price: 1,
                currency_id: "ARS"
            }],
            back_urls: {
                success: `localhost:3001/users/premium/${id}`,
                failure: "https://music.youtube.com/watch?v=jtXDIfWjMkQ",
                pending: "https://www.youtube.com/watch?v=vEXwN9-tKcs",
            },
            auto_return: "approved"
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        return result.init_point;
    }

    @Get("success")
    success() {
        return "Order created successfully";
    }

    @Get("webhook")
    webhook() {
        return "webhook";
    }
}
