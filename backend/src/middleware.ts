import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET  } from "./config.js";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
    const authHeader = req.headers["authorization"];
    if (!authHeader){
        return res.status(401).json({message : " No Authorization header"});
    }

     const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid Authorization header format" });
    }

    const token = parts[1];

    const decoded = jwt.verify(token as string, JWT_SECRET )
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
        message : "Invalid or expired token" 
    })
} 

} 