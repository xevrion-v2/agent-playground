import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an async Express route handler so that rejected promises
 * are automatically forwarded to the error-handling middleware.
 *
 * Usage:
 *   router.get("/users", asyncHandler(async (req, res) => {
 *     const users = await userService.findAll();
 *     res.json({ data: users });
 *   }));
 *
 * @param fn - The async route handler function
 * @returns An Express RequestHandler that catches promise rejections
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
