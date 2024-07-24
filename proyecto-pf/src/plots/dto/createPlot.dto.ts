import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

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
        description: "UUID del usuario dueño del lote",
        type: String,
        example: "UUID",
        required: true,
        nullable: false
    })
    @IsNotEmpty()
    @IsUUID()
    user: string;
}