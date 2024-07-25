import { applyDecorators, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";
import { RolesEnum } from "./entities/roles.entity";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { roleGuard } from "src/auth/guards/roles.guard";


export function getUserDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Obtiene una lista paginada de usuarios", description: "Obtiene una lista paginada de usuarios recibiendo por QueryParams limit(cantidad de usuarios de la pagina) y page(pagina de la lista)"}),
        ApiResponse({status: 200, description: "Los usuarios fueron obtenidos de forma exitosa"}),
        ApiParam({name:"page", required: false, description: "numero de pagina en la lista de usuarios(default:1)", type: Number}),
        ApiParam({name:"limit", required: false, description: "Cantidad de usuarios mostrados en una pagina(Default:5)", type: Number}),
        ApiBearerAuth(),
        HttpCode(200),
        RolesDecorator(RolesEnum.ADMIN),
        //UseGuards(AuthGuard, roleGuard),
    )
}


export function getUserByIdDecoractor() {
    return applyDecorators(

        ApiOperation({summary: "Obtiene al usuario por id", description: "obtiene un objeto de usuario con sus datos no sensibles"}),
        ApiResponse({status: 200, description: "El usuario fue obtenido de forma exitosa"}),
        ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
        ApiParam({name: "id", required: true, description: "el id del usuario que se quiere obtener", schema: {type: "string", format: "UUID"}}),
        ApiBearerAuth(),
        HttpCode(200),
        //RolesDecorator(RolesEnum.ADMIN),
        //UseGuards(AuthGuard, roleGuard)
    )
}

export function updateUserDecorator() {
    return applyDecorators(
        
        ApiOperation({summary: "modifica las propiedades de un usuario", description: "Modifica el usuario recibiendo los campos a modificar por body y el id de usuario por params"}),
        ApiResponse({status: 200, description: "El usuario fue actualizado de forma exitosa"}),
        ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
        ApiResponse({status: 400, description: "La petición es incrorrecta"}),
        ApiResponse({status: 409, description: "El email ya esta en usó"}),
        ApiParam({name:"id", required: true, description: "UUID del usuario a modificar", schema: {type: "string", format: "UUID"}}),
        ApiBearerAuth(),
        HttpCode(200),
        //RolesDecorator(RolesEnum.USER),
        //UseGuards(AuthGuard, roleGuard)
    )
}

export function deleteUserDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Elimina a un usuario", description: "realiza un borrado logico del usuario recibiendo su id por params"}),
        ApiResponse({status: 200, description: "El usuario fue eliminado de forma exitosa"}),
        ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
        ApiResponse({status: 409, description: "El usuario ya se encontraba eliminado"}),
        ApiParam({name:"id", required: true, description: "UUID del usuario eliminar", schema: {type: "string", format: "UUID"}}),
        ApiBearerAuth(),
        HttpCode(200),
        //RolesDecorator(RolesEnum.USER),
        //UseGuards(AuthGuard, roleGuard)
    )
    }


    export function changePasswordDecorator() {
        return applyDecorators(

            ApiOperation({summary: "cambia la contraseña", description: "cambia la contraseña de un usuario recibiendo su id por params y los datos de las contraseñas por body"}),
            ApiResponse({status: 200, description: "El usuario cambió su contraseña con éxito"}),
            ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
            ApiResponse({status: 409, description: "Las nuevas contraseñas no coinciden o la vieja contraseña no es correcta"}),
            ApiParam({name:"id", required: true, description: "UUID del usuario", schema: {type: "string", format: "UUID"}}),
            ApiBearerAuth(),
            HttpCode(200),
            //RolesDecorator(RolesEnum.USER),
            //seGuards(AuthGuard, roleGuard)
        )
    }

    export function getAllUsersDecorator() {
        return applyDecorators(
            ApiOperation({summary: "Obtiene una lista de todos los usuarios"}),
            ApiResponse({status: 200, description: "El usuario cambió su contraseña con éxito"}),
            HttpCode(200),
            ApiBearerAuth(),
            //RolesDecorator(RolesEnum.USER),
            //UseGuards(AuthGuard, roleGuard)
        )
    }

