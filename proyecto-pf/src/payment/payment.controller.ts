import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
// SDK de Mercado Pago
import mercadopago, { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-1663701245874689-072419-b6f3e56cba7db17d42d4a9eff5d60df0-1490519917' });

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
    @Get("create-order")
    async createOrder() {
        const body = {
            items: [{
                id: '1234', 
                title: "subTest",
                quantity: 1,
                unit_price: 1,
                currency_id: "ARS"
            }],
            back_urls: {
                success: "localhost:3000/api",
                failure: "https://www.youtube.com/watch?v=vEXwN9-tKcs",
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
