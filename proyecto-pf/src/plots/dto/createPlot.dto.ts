import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePlotDto {

    
    @IsNotEmpty()
    @IsString()
    surface: number;
    @IsNotEmpty()
    @IsString()
    cereal: string;
    
    @IsNotEmpty()
    @IsUUID()
    user: string;
}