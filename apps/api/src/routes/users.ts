import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a paginated list of users.
 *
 * TODO: Replace stub with real database query using Prisma.
 * TODO: Support pagination via ?page= and ?limit= query params.
 * TODO: Support filtering by name or email.
 * TODO: Return proper error response on database failure.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user.
 *
 * TODO: Validate request body (email required, name optional).
 * TODO: Check for duplicate email before inserting.
 * TODO: Hash password before storing (when auth is added).
 * TODO: Return 400 with validation errors for invalid input.
 * TODO: Return 409 if email already exists.
 * TODO: Persist user to database via Prisma and return created record.
 */
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
