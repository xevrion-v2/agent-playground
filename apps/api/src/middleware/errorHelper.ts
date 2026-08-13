import { Request, Response } from "express";

/**
 * Sends a structured JSON error response.
 *
 * @param res  Express response object
 * @param status  HTTP status code
 * @param message  Human-readable error description
 */
export function sendError(res: Response, status: number, message: string): void {
  res.status(status).json({
    error: {
      status,
      message,
    },
  });
}

/**
 * Wraps an async route handler to catch rejected promises
 * and forward them to Express error middleware.
 */
export function asyncHandler(
  fn: (req: Request, res: Response) => Promise<void>
) {
  return (req: Request, res: Response): void => {
    Promise.resolve(fn(req, res)).catch(() => {
      sendError(res, 500, "Internal server error");
    });
  };
}
