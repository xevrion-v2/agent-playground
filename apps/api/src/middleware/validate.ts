import { Request, Response, NextFunction } from "express";

export function validateUserInput(req: Request, res: Response, next: NextFunction): void {
  const { email, name } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ status: "error", message: "Email is required and must be a string." });
    return;
  }

  if (!name || typeof name !== "string") {
    res.status(400).json({ status: "error", message: "Name is required and must be a string." });
    return;
  }

  next();
}
