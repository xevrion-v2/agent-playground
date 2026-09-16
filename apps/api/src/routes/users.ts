import { Router } from "express";

const router = Router();

// TODO (Issue #10): Implement GET /users endpoint
// Expected behavior:
// - Query database for all users with pagination support (page, limit params)
// - Support optional filtering by: role, status, createdAt date range
// - Support sorting by: name, email, createdAt, updatedAt
// - Return user list with metadata (total count, page info)
// Error cases to handle:
// - 400: Invalid query parameters (negative page/limit, invalid sort field)
// - 401: Unauthorized (missing/invalid JWT token)
// - 403: Forbidden (insufficient permissions to list users)
// - 500: Database connection error
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO (Issue #10): Implement POST /users endpoint
// Expected behavior:
// - Validate required fields: email (valid format), password (min 8 chars), name
// - Check if user with same email already exists (return 409 if exists)
// - Hash password using bcrypt with salt rounds >= 10
// - Create user record in database with default role "user"
// - Send welcome email with verification link (async, don't block response)
// - Return created user object (excluding password hash)
// Error cases to handle:
// - 400: Missing required fields, invalid email format, weak password
// - 401: Unauthorized (missing/invalid API key for registration)
// - 409: Conflict (email already registered)
// - 422: Validation error (custom validation rules failed)
// - 500: Database write error, email service unavailable
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
