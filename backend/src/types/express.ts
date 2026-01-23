import "express";

/**
 * Global augmentation for Express Request
 * This tells TypeScript that `req.userId` exists
 */
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export {};
