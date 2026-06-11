import { Router } from "express";

const router = Router();

// TODO: Implement user listing endpoint
// Expected behavior:
// - Query users from database with pagination support (page, pageSize params)
// - Support filtering by role, status, or search term
// - Support sorting by created date, name, etc.
// - Return array of user objects with id, email, name, role, createdAt
// Error cases to handle:
// - Invalid pagination parameters (non-numeric, negative values)
// - Database connection failures
// - Unauthorized access (requires authentication)
// - Invalid filter or sort parameters
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement user creation endpoint
// Expected behavior:
// - Validate required fields (email, name, password)
// - Hash password before storing
// - Check for duplicate email/username
// - Create user record in database
// - Return created user object (without password)
// - Send verification email if email verification is enabled
// Error cases to handle:
// - Missing required fields (400 Bad Request)
// - Invalid email format (400 Bad Request)
// - Weak password (400 Bad Request)
// - Duplicate email or username (409 Conflict)
// - Database write failures (500 Internal Server Error)
// - Unauthorized access (requires admin role) (403 Forbidden)
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
