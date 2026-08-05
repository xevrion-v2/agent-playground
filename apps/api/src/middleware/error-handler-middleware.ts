import { Request, Response, NextFunction } from "express";

/**
 * error-handler middleware.
 */
export function errorhandlerMiddleware(_req: Request, _res: Response, next: NextFunction) {
  next();
}
