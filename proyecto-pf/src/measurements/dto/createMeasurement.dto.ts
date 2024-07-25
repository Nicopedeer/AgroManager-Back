import { IsNotEmpty, IsString } from "class-validator";

export class CreateMeasurementDto{
    @IsNotEmpty()
    @IsString()
    name: string
}