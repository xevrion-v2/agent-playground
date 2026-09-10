import { Request, Response, NextFunction } from "express";

/**
 * request logger middleware.
 */
export function requestloggerMiddleware(_req: Request, _res: Response, next: NextFunction) {
  next();
}
