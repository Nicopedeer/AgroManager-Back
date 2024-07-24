import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class AddSupplyDto{
    @ApiProperty({
        description: "El UUID del insumo",
        type: String,
        example: "UUID",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    supplyId: string

    @ApiProperty({
        description: "El UUID del lote",
        type: String,
        example: "UUID",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    plotId: string

    
    @ApiProperty({
        description: "La cantidad que se quiere usar",
        type: String,
        example: "3",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    quantity: number
}