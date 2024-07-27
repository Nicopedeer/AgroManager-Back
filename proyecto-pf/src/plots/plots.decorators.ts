import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";
import { roleGuard } from "src/auth/guards/roles.guard";
import { TokenGuard } from "src/auth/guards/token.guard";
import { RolesEnum } from "src/users/entities/roles.entity";





export function  getPlotByIdDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene un lote por id", description: "obtiene un lote con toda su infromación y relaciones obteniendo su id por params"}),
        HttpCode(200),
        ApiParam({name: "id", description: "id de el lote que se desea obtener"}),
        ApiResponse({status: 200, description: "el lote se obtuvo con éxito"}),
        ApiResponse({status: 404, description: "no se encontro el lote"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard),
        
    )
}

export function getUsersPlotsById() {
    return applyDecorators(
        ApiOperation({summary: "obtiene los lotes de un usuario", description: "Obtiene todos los lotes que esten vinculados a un usuario obteniendo su id por params"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvieron los lotes con éxito"}),
        ApiResponse({status: 404, description: "no se ha encotnrado el usuario"}),
        ApiParam({name: "id", description: "id de el usuario"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard, TokenGuard)
    )
}


export function createPlotDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Crea un nuevo lote", description: "crea un nuevo lote obteniendo sus datos por body y el id del usuario a asignar por params"}),
        HttpCode(200),
        ApiResponse({status: 201, description: "lote creado con  éxito"}),
        ApiResponse({status: 404, description: "no se ha encotnrado el usuario"}),
        ApiParam({name: "id", description: "id de el usuario"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard, TokenGuard)
    )
}

export function addLaborDecorator() {
    return applyDecorators(
        ApiOperation({summary: "le añade una nueva labor a un lote", description: "le añade una nueva labor a un lote obteniendo sus datos por body"}),
        HttpCode(201),
        ApiResponse({status: 201, description: "labor añadida con éxito"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard)
    )
}



export function addSupplyDecorator() {
    return applyDecorators(
        ApiOperation({summary: "destina insumos a un lote", description: "destina el insumo seleccionado al lote seleccionado"}),
        ApiResponse({status: 200, description: "insumo destinado al lote con éxito"}),
        ApiResponse({status: 404, description: "el insumo o lote no fue encontrado"}),
        ApiResponse({status: 409, description: "no hay cantidad suficiente del insumo"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard)
    )
}


