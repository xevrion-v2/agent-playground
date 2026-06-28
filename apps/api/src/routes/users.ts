import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Lists all users in the system.
 */
router.get("/", (_req, res) => {
  // TODO: Implement pagination using 'page' and 'limit' query parameters.
  // TODO: Fetch users from Prisma database.
  // TODO: Filter users by role or active status if requested.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user.
 */
router.post("/", (req, res) => {
  // TODO: Validate request body using Zod schema (ensure email is valid and name is provided).
  // TODO: Check if user with the same email already exists in the database.
  // TODO: Hash password before saving if authentication is being handled locally.
  // TODO: Emit 'user.created' event for downstream services (messaging, billing).
  // TODO: Handle potential database connection errors or unique constraint violations.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
