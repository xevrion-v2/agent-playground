/**
 * User service — handles user business logic.
 *
 * Currently provides stubs for list and create operations.
 * Real database integration will replace these placeholders
 * once the Prisma client and DB workspace are wired in.
 */
import { Request, Response } from "express";

/**
 * Return a placeholder user list.
 * Always returns an empty array with a descriptive message.
 */
export function listUsers(_req: Request, res: Response): void {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
}

/**
 * Create a placeholder user record.
 * Returns the request body wrapped in a stub response
 * with a hard-coded ID and a descriptive message.
 */
export function createUser(req: Request, res: Response): void {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
}
