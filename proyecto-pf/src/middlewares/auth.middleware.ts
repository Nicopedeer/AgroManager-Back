import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['next-auth.session-token'] || req.headers['authorization']?.split(' ')[1];
    if (token) {
      req['sessionToken'] = token;
    }
    next();
  }
}
