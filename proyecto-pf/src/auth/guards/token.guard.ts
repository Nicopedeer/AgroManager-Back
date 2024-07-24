import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        

        if (!token) {
            throw new UnauthorizedException("Se necesita un token");
        }

            const secret =  process.env.JWT_SECRET
            const decodedToken = this.jwtService.verify(token, {secret});
            const userIdFromToken = decodedToken.sub; 
            const userIdFromParams = request.params;
            console.log(userIdFromParams)

            if (userIdFromToken !== userIdFromParams.id) {
                throw new UnauthorizedException("No tienes autorizacion para acceder");
            }

            return true; 
    
    }
}
