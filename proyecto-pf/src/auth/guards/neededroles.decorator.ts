import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "src/users/entities/roles.entity";





export const RolesDecorator = (...roles: RolesEnum[]) => SetMetadata("role", roles)