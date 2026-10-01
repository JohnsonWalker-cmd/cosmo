import type { NextFunction , Request ,Response}from "express"
import { verifyToken } from "../lib/jwt.js"


declare global {
    namespace Express {
        interface Request{
            user?: {
                userId: string;
                role: "admin" | "customer" | "guest";
            }
        }
    }
}

export function requireAuth(req:Request , res:Response, next: NextFunction){
    const token = req.cookies.token;
    if(!token) return res.status(401).json({ error: "Not signed in"}) ;

    try {
        req.user = verifyToken(token);
        next();
    }catch(error){
        return res.status(401).json({ error: "Invalid or expired session"})
    }
}

export function requireAdmin(req: Request , res:Response , next: NextFunction){
    if(req.user?.role !== "admin"){
        return res.status(403).json({ error: "Admins only"})
    }
    next();
}
