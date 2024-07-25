import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    
    @ApiProperty({
        description: "nombre de la categoria",
        example: "fertilizantes"
    })
    @IsNotEmpty()
    @IsString()
    name: string
}