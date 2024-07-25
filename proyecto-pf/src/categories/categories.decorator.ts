import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";
import { roleGuard } from "src/auth/guards/roles.guard";
import { RolesEnum } from "src/users/entities/roles.entity";





export function getCategoriesDecorator() {
    return applyDecorators(
        ApiOperation({summary: "obtiene todas las categorias"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se obtuvo el array de categorias"})
    ) 
}


export function createCategoryDecorator() {
    return applyDecorators(
        ApiOperation({summary: "crea una nueva categoria"}),
        HttpCode(201),
        ApiResponse({status: 201, description: "la categoria fue creada con éxito"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    )
}