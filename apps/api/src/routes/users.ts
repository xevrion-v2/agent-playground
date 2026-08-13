import { Router, Request, Response } from "express";

const router = Router();

/**
 * Retrieves a paginated list of users.
 *
 * TODO: Implement pagination with `page` and `limit` query parameters.
 * TODO: Support filtering by `role` (admin, freelancer, client) via query string.
 * TODO: Return a `UserResponse<User[]>` envelope with total count metadata.
 *
 * @route GET /users
 */
router.get("/", (_req: Request, res: Response): void => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Creates a new user with the provided payload.
 *
 * TODO: Validate required fields (`email`, `name`, `role`) using Zod schema.
 * TODO: Check for duplicate email before creation — return 409 Conflict if exists.
 * TODO: Hash password field if `role` is not "client" (freelancer/admin accounts).
 * TODO: Send a welcome email via the notifications service after successful creation.
 *
 * @route POST /users
 */
router.post("/", (req: Request, res: Response): void => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
