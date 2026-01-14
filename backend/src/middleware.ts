import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

/**
 * We extend JwtPayload so TypeScript knows
 * that our token contains a `userId` field.
 * 
 * Why?
 * When we create the token we do:
 * jwt.sign({ userId: user._id }, JWT_SECRET)
 */
interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

/**
 * userMiddleware
 * ----------------
 * This middleware protects private routes.
 * It checks if the request has a valid JWT token.
 */
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * STEP 1: Read Authorization header
     * Expected format:
     * Authorization: Bearer <token>
     */
    const authHeader = req.headers.authorization;

    // If header is missing, user is not authenticated
    if (!authHeader) {
      return res.status(401).json({
        message: "No Authorization header",
      });
    }

    /**
     * STEP 2: Validate header format
     * We split on space → ["Bearer", "<token>"]
     */
    const parts = authHeader.split(" ");

    // Header must have exactly 2 parts and start with "Bearer"
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid Authorization header format",
      });
    }

    /**
     * STEP 3: Extract token
     */
    const token = parts[1];

    /**
     * STEP 4: Verify JWT
     * - Checks token signature
     * - Checks token expiry
     * - Decodes payload
     */
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as CustomJwtPayload;

    /**
     * STEP 5: Validate token payload
     * If token does not contain userId,
     * it is considered invalid.
     */
    if (!decoded.userId) {
      return res.status(403).json({
        message: "Invalid token payload",
      });
    }

    /**
     * STEP 6: Attach userId to request object
     * 
     * WHY req.userId and not req.body?
     * - req.body is user input (unsafe)
     * - req.userId is server-controlled (safe)
     * - This prevents userId spoofing
     */
    req.userId = decoded.userId;

    /**
     * STEP 7: Call next middleware / route handler
     */
    next();

  } catch (error) {
    /**
     * If jwt.verify fails:
     * - Token is expired
     * - Token is malformed
     * - Token signature is invalid
     */
    console.error(error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
