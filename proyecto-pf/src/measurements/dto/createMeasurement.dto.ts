import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMeasurementDto{
    @ApiProperty({
        description: "nombre de la unidad de medida",
        example: "Bolsas"
    })
    @IsNotEmpty()
    @IsString()
    name: string
}