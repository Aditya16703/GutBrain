import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET  } from "./config.js";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_SECRET )
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        if (typeof decoded !== "string") {
        req.body.userId = decoded.id;
     }

        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}catch(error) {
    console.log(error) ;
    res.status(500).json({
        message : "Internal server error" 
    })
} 

} 