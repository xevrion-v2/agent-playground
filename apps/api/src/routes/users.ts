import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Implement user listing logic.
  // Expected Future Behavior:
  // - Retrieve users from the database using Prisma (e.g., `prisma.user.findMany()`).
  // - Support pagination using query parameters: `limit` (default: 10, max: 100) and `offset` (default: 0).
  // - Support filtering and searching by name, email, or role via query parameters.
  // - Support sorting by fields (e.g., `createdAt`, `name`) in ascending or descending order.
  // - Ensure sensitive user data (like passwords, secret tokens) is excluded from the returned payload.
  // Error Cases to Handle:
  // - 400 Bad Request: Invalid query parameter values (e.g., negative pagination limits, unsupported sort fields).
  // - 401 Unauthorized: Requests without valid JWT authentication tokens.
  // - 403 Forbidden: Authenticated users attempting to access endpoints without admin privileges.
  // - 500 Internal Server Error: Database connection timeouts, prisma client query execution errors, or generic server failures.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Implement user creation logic.
  // Expected Future Behavior:
  // - Validate the request body shape and types using Zod validation schemas.
  // - Verify if a user with the provided email already exists to prevent duplicate registrations.
  // - Securely hash the user's password using bcrypt or argon2 before database insertion.
  // - Create and persist the new User record in the database using Prisma (e.g., `prisma.user.create()`).
  // - Return the newly created user resource (excluding sensitive credentials) with a 201 Created status.
  // - Trigger background/downstream processes (e.g., send registration confirmation email, assign default workspace).
  // Error Cases to Handle:
  // - 400 Bad Request: Missing required fields, malformed request body, or invalid email format.
  // - 409 Conflict: Email address is already in use by another account.
  // - 500 Internal Server Error: Prisma transaction failures, database constraint violations, or unexpected network failures.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
