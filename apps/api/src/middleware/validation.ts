import { Request, Response, NextFunction } from "express";

// Validate that the request body contains an email string.
export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { email, name } = req.body || {};

  if (!email || typeof email !== "string" || !email.trim()) {
    res.status(400).json({
      error: "Bad Request",
      message: "The 'email' field is required and must be a non-empty string"
    });
    return;
  }

  if (name !== undefined && typeof name !== "string") {
    res.status(400).json({
      error: "Bad Request",
      message: "The 'name' field, if provided, must be a string"
    });
    return;
  }

  next();
}
