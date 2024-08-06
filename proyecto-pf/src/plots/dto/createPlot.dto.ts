import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";
import { isFloat64Array } from "util/types";

export class CreatePlotDto {

    @ApiProperty({
        description: "El tamaño en Hectareas del lote",
        type: String,
        example: 50,
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    surface: number;

    @ApiProperty({
        description: "El cereal que se sembro en el lote",
        type: String,
        example: "Trigo",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    cereal: string;
    
    @ApiProperty({
        description: "La latitud del lote",
        type: String,
        example: "-36,1118",
        required: false,
        nullable: true
    })
    @IsOptional()
    @IsString()
    latitude: string


    @ApiProperty({
        description: "La longitud del lote",
        type: String,
        example: "-61,1118",
        required: false,
        nullable: true
    })
    @IsOptional()
    @IsString()
    longitude: string
}