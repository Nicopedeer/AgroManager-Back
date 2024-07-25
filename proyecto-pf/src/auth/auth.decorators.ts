import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RolesDecorator } from "./guards/neededroles.decorator";
import { RolesEnum } from "src/users/entities/roles.entity";
import { roleGuard } from "./guards/roles.guard";
import { AuthGuard } from "./guards/auth.guards";



export function signUpDecorator() {
    return applyDecorators(
        HttpCode(201),
        ApiOperation({summary: "Registra un usuario", description: "a completar con la autenticación de terceros"}),
        ApiResponse({status: 201, description: "usuario creado con éxito"})

    )
}

export function signInDecorator() {
    return applyDecorators(
        HttpCode(200),
        ApiOperation({summary: "logea un usuario", description: "a completar con la autenticación de terceros"}),
        ApiResponse({status: 200, description: "El usuario se ha logeado con éxito"})   
    ) 
}

export function giveAdminDecorator() {
    return applyDecorators(
        HttpCode(200),
        ApiOperation({summary: "le otorga el rol de administrador a un usuario", description: "le otorga el rol de administrador a un usuario"}),
        ApiResponse({status: 200, description: "El usuario se ha convertido en administrador"}),
        ApiResponse({status: 404, description: "el usuario no se ha encontrado"}),
        ApiResponse({status: 409, description: "el usuario ya era administrador"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.ADMIN),
        UseGuards(AuthGuard,roleGuard)
    )
}
