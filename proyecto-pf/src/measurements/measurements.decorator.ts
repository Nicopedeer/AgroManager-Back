import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";



export function getMeasurementsDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene todas las medidas"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvó correctamente todas las medidas"}),
        //ApiBearerAuth(),
        //RolesDecorator(),
        //UseGuards()
    ) 
}


export function createMeasurementDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene todas las medidas"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvó correctamente todas las medidas"}),
        //ApiBearerAuth(),
        //RolesDecorator(),
        //UseGuards()
    )
}

