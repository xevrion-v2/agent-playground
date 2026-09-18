import { Request, Response, NextFunction } from "express";

/**
 * not-found middleware.
 */
export function notfoundMiddleware(_req: Request, _res: Response, next: NextFunction) {
  next();
}
