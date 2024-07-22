import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers["authorization"];
        
        if (!authHeader) {
            throw new UnauthorizedException("Authorization header is missing");
        }

        const [authType, token] = authHeader.split(" ");
        
        if (authType !== "Bearer") {
            throw new UnauthorizedException("Authorization type is invalid");
        }

        try {
            const secret = process.env.JWT_SECRET;
            const payload = await this.jwtService.verify(token, { secret });
            payload.iat = new Date(payload.iat * 1000);
            payload.exp = new Date(payload.exp * 1000);
            request.user = payload;
            console.log(payload)

            return true;
        } catch (err) {
            throw new UnauthorizedException("Invalid token");
        }
    }
}
