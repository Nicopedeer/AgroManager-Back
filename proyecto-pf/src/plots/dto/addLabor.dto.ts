import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID} from "class-validator";

export class AddLaborDto{
    @ApiProperty({
        description: "el labor que se hizo",
        type: Object,
        example:{
            name: "Fumigada",
            contractor: "Pando Servicios S.A.",
            price: 6,
            surface: 20
        },
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    labor:{
        name: string;
        contractor: string;
        price: number;
        surface: number;
    }

    @ApiProperty({
        description: "el UUID del lote",
        type: String,
        example: "UUID",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsUUID()
    plotId: string
}