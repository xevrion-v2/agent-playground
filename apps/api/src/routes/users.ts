import { Router } from "express";

const router = Router();

// TODO: Implement paginated user listing with query filters (e.g. ?search=&limit=&offset=).
// TODO: Return proper error response (500) when the database query fails.
// TODO: Add authentication middleware so only authenticated users can list users.
// TODO: Support filtering by role or account status once those fields exist on the User model.
router.get("/", (_req, res) => {
  // TODO: Replace this stub with a real Prisma query: prisma.user.findMany(...)
  // TODO: Validate query parameters (limit, offset, search) using zod or joi.
  // TODO: Return 400 with a descriptive message when query params are invalid.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body fields (email required, name optional) and return 400 on validation failure.
// TODO: Check for duplicate email and return 409 Conflict when a user already exists.
// TODO: Return 500 with a generic error message when the database write fails unexpectedly.
// TODO: Hash sensitive fields before persisting if the User model gains password or token columns.
router.post("/", (req, res) => {
  // TODO: Replace this stub with a real Prisma query: prisma.user.create({ data: req.body })
  // TODO: Return the created user with a 201 status and Location header pointing to /users/:id.
  // TODO: Wrap the handler in a try/catch and forward errors to the Express error-handling middleware.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Add GET /users/:id route to fetch a single user by ID.
// TODO: Add PATCH /users/:id route to update user fields (name, email).
// TODO: Add DELETE /users/:id route with soft-delete support.
// TODO: Add a global error-handling middleware that catches unhandled route errors and returns 500.

export default router;
