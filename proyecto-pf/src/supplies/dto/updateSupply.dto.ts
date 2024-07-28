import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSupplyDto{
    @ApiProperty({
        description: "El nombre del insumo",
        type: String,
        example: "Silotrato"
    })
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        description: "El proveedor del insumo",
        type: String,
        example: "BioGrow"
    })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    provider: string;

    @ApiProperty({
        description: "El stock del insumo",
        type: Number,
        example: 10,
    })
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    stock: number;

    @ApiProperty({
        description: "El precio unitario del insumo",
        type: Number,
        example: 300,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    price: number;
}