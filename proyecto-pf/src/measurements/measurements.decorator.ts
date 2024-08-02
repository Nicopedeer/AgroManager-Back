import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";
import { roleGuard } from "src/auth/guards/roles.guard";
import { RolesEnum } from "src/users/entities/roles.entity";



export function getMeasurementsDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene todas las medidas"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvó correctamente todas las unidades de medida"}),
        //ApiBearerAuth(),
        //RolesDecorator(),
        //UseGuards()
    ) 
}


export function createMeasurementDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Crea una nueva unidad de medida"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se creo correctamente una nueva unidad de medida"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    )
}

