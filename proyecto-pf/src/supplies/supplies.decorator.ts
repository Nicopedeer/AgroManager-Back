import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";
import { roleGuard } from "src/auth/guards/roles.guard";
import { TokenGuard } from "src/auth/guards/token.guard";
import { RolesEnum } from "src/users/entities/roles.entity";





export function getSuppliesByUserIdDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene los insumos de un usuario", description: "obtiene un array con los insumos de el usuario recibiendo su id por params"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvieron los insumos con éxito"}),
        ApiParam({name: "id", required: true, description: "el id del usuario"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard, TokenGuard)
    )
}


export function createSupplyDecorator() {
    return applyDecorators(
        ApiOperation({summary: "crea insumos y los agrega a un usuario", description: "crea un insumo recibiendo por body los datos del insumo y el id del usuario"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se creó el insumo con éxito"}),
        ApiParam({name: "id", description: "el id del usuario al que se le desea crear el insumo"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard, TokenGuard)
    )
}


export function updateSupplyDecorator() {
    return applyDecorators(
        ApiOperation({summary: "actualiza un insumo", description: "actualiza un insumo recibiendo los datos a actualizar por params y el id del insumo por params"}),
        ApiParam({name: "id", description: "el id del insumo que se desea actualizar"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "el insumo ha sido actualizado con éxito"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard)
    )
}


export function getSuppliesByCategoryDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene los insumos según su categoria", description: "obtiene una lista completa de los insumos obtieniendo por param su categoria"}),
        ApiParam({name: "id", description: "id de la categoria"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvieron los insumos con éxito"}),
        ApiResponse({status: 404, description: "no se encontro la categoria"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard)
    ) 
}

