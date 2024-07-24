import { IsNotEmpty, IsUUID} from "class-validator";

export class AddLaborDto{

    @IsNotEmpty()
    labor:{
        name: string;
        contractor: string;
        price: number;
        surface: number;
    }
    @IsNotEmpty()
    @IsUUID()
    plotId: string
}