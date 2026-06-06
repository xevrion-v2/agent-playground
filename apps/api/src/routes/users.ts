import { Router } from "express";

const router = Router();

// TODO: Add pagination (offset/cursor) with configurable page size
// TODO: Support filtering by role, status, and registration date
// TODO: Add search by name or email with partial matching
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body with Zod schema (email format, name length, password strength)
// TODO: Check for duplicate email before creating user
// TODO: Hash password before storing (bcrypt or argon2)
// TODO: Return 400 for invalid input, 409 for duplicate email
// TODO: Send verification email after successful registration
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: GET /:id — Fetch single user by ID, return 404 if not found
// TODO: PUT /:id — Update user fields, return 400 for invalid input
// TODO: DELETE /:id — Soft-delete user, return 404 if not found
// TODO: Add auth middleware to protect write endpoints

export default router;
