import { HttpCode, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guards";
import { RolesDecorator } from "src/auth/guards/neededroles.decorator";
import { roleGuard } from "src/auth/guards/roles.guard";
import { RolesEnum } from "src/users/entities/roles.entity";

export function fileUploadDecorator(){
    return applyDecorators(
        ApiOperation({summary: "Actualiza la imagen de un insumo", description: "actualiza la imagen de un insumo por Id, recibiendo el Id por params"}),
        HttpCode(200),
        ApiResponse({status: 200, description: "se actualizo el insumo con éxito"}),
        ApiParam({name: "id", required: true, description: "el id del insumo"}),
        ApiBearerAuth(),
        RolesDecorator(RolesEnum.USER),
        UseGuards(AuthGuard, roleGuard)
    )
}