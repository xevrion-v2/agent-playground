import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Express request logger middleware.
 * Logs HTTP method, URL, status code, and response duration for each request.
 *
 * Usage:
 *   app.use(requestLogger);
 *
 * Output format:
 *   [2024-01-01T12:00:00.000Z] GET /health 200 5ms
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  const { method, url } = req;

  // Log when the response is finished
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const { statusCode } = res;
    const timestamp = new Date().toISOString();

    // Use console.log for simple, dependency-free logging
    console.log(
      `[${timestamp}] ${method} ${url} ${statusCode} ${duration}ms`
    );
  });

  next();
};

/**
 * Creates a configurable request logger with optional custom logger function.
 *
 * @param options - Configuration options
 * @returns An Express RequestHandler
 */
export const createRequestLogger = (options?: {
  logger?: (message: string) => void;
  includeTimestamp?: boolean;
}): RequestHandler => {
  const logger = options?.logger ?? console.log;
  const includeTimestamp = options?.includeTimestamp ?? true;

  return (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now();
    const { method, url } = req;

    res.on("finish", () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const timestamp = includeTimestamp
        ? `[${new Date().toISOString()}] `
        : "";

      logger(`${timestamp}${method} ${url} ${statusCode} ${duration}ms`);
    });

    next();
  };
};

export default requestLogger;
