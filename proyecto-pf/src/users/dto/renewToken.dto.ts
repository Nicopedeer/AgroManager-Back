import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RenewTokenDto {
    @ApiProperty({
        description: "El token del usuario",
        type: String,
        example: "token del usuario",
        required: true,
        nullable: false
    })
    @IsString()
    @IsNotEmpty()
    token: string
}