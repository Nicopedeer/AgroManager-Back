import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSupplyDto{
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
        type: Number,
        example: 10,
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty({
        description: "El precio unitario del insumo",
        type: Number,
        example: 300,
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        description: "UUID de la categoria del insumo",
        type: String,
        example: "UUID",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsUUID()
    category: string;

    @ApiProperty({
        description: "UUID de la unidad de medida del insumo",
        type: String,
        example: "UUID",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsUUID()
    measurement: string;
    
    

}


