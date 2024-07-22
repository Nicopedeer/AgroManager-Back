import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RolesEnum } from "src/users/entities/roles.entity";






@Injectable()
export class roleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const allowedRoles = this.reflector.getAllAndOverride<RolesEnum[]>("role", [context.getHandler(), context.getClass()])
        const request = context.switchToHttp().getRequest()
        const userRole = request.user.roles
        console.log(userRole)
        
        for (const role of userRole) {
            if (allowedRoles.includes((role.name))) {return true}
        }
        
        return false
    }



    
}