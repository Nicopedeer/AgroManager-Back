import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSupplyDto{
    @ApiProperty({
        description: "El nombre del insumo",
        type: String,
        example: "Silotrato",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "El proveedor del insumo",
        type: String,
        example: "BioGrow",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    provider: string;

    @ApiProperty({
        description: "El stock del insumo",
        type: String,
        example: 10,
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    stock: number;

    @ApiProperty({
        description: "El precio unitario del insumo",
        type: String,
        example: 300,
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    price: number;
}