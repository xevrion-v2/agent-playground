import { Router } from "express";

const router = Router();

// TODO: Implement pagination with cursor-based or offset pagination
// TODO: Support query filters (role, status, search by name/email)
// TODO: Add sorting options (created_at, name, etc.)
// TODO: Return user count metadata for pagination
// TODO: Add authorization check to restrict access to admin users
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body fields (email format, required name, password strength)
// TODO: Hash password before storing (bcrypt or argon2)
// TODO: Check for duplicate email and return 409 Conflict
// TODO: Persist user to database via Prisma and return created record
// TODO: Emit user.created event for downstream consumers
// TODO: Add rate limiting to prevent abuse of account creation
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Implement GET /:id to fetch a single user by ID with 404 handling
// TODO: Implement PUT /:id for full user updates with validation
// TODO: Implement PATCH /:id for partial user updates
// TODO: Implement DELETE /:id with soft-delete support
// TODO: Add middleware for authentication and authorization on mutating routes

export default router;
