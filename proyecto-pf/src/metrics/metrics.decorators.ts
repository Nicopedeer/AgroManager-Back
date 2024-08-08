import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";
import { roleGuard } from "src/auth/guards/roles.guard";
import { RolesEnum } from "src/users/entities/roles.entity";





export function getActiveMetricsDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene las metricas sobre el estado de los uaurios", description: "obtiene metricas sobre el estado de los usuarios(activo, inactivo o eliminado), proporciona el total de usuarios, el detalle de cada estado y el numero porcentual que representan."}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvieron la smetricas de forma correcta"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    
    )
}


export function getMembershipMetricsDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene las metricas sobre las subscripciones de los usuarios, obtiene en numeros y sus respectivos porcentajes"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvieron la smetricas de forma correcta"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    )
}

export function userUseTodayDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene las metricas sobre el uso de los usuarios en el último dia."}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvieron la smetricas de forma correcta"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    )
}



export function lastMonthSubscriptionDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene el numero sobre las subscripciones de los usuarios en el ultimo mes"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvieron la smetricas de forma correcta"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    )
}