import { NextFunction } from "express";






export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const date = new Date()
    const time = date.toLocaleTimeString()
    console.log(`Se envió una petición con el metodo ${req.method}, a la ruta ${req.url} a las ${time}`)
    next()
}