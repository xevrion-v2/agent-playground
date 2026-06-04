import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 * Returns a paginated list of registered users.
 *
 * TODO: Add authentication middleware to restrict access.
 * TODO: Implement database query via Prisma to fetch real users.
 * TODO: Add pagination support (page, limit query params).
 * TODO: Add filtering by role, name, or email.
 * TODO: Return proper user objects with id, email, name, createdAt.
 * TODO: Handle database errors with 500 response.
 * TODO: Add rate limiting for list endpoints.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user account.
 *
 * TODO: Add input validation using Zod schema (email required, name optional).
 * TODO: Add rate limiting to prevent abuse.
 * TODO: Hash password if password-based auth is added.
 * TODO: Check for duplicate email and return 409 Conflict.
 * TODO: Persist the new user to the database via Prisma.
 * TODO: Return the created user with its database-generated ID.
 * TODO: Emit a user-created event for downstream services.
 * TODO: Handle database errors (connection failure, constraint violation).
 * TODO: Add authentication middleware if registration requires invite.
 */
router.post("/", (req: Request, res: Response) => {
  // TODO: Validate request body before processing
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
