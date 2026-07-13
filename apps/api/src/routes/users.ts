import { Router } from "express";

const router = Router();

// TODO: Implement user listing with pagination, filtering, and sorting
// Expected behavior:
// - Support query parameters: page, limit, sortBy, sortOrder, filter
// - Return paginated response with metadata (total, page, limit, totalPages)
// - Support filtering by email, name, role, status
// - Support sorting by createdAt, updatedAt, email, name
// Error cases:
// - 400: Invalid query parameters (e.g., negative page, limit > 100)
// - 401: Unauthorized - missing or invalid authentication token
// - 403: Forbidden - insufficient permissions to list users
// - 500: Internal server error - database connection failure
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement user creation with validation and duplicate checking
// Expected behavior:
// - Validate request body: email (required, valid format), name (required, 1-100 chars), role (optional, enum: user/admin)
// - Check for duplicate email before creating
// - Hash password if provided (or generate temporary password)
// - Return created user with 201 status and Location header
// Error cases:
// - 400: Validation error - missing required fields, invalid email format, name too long
// - 401: Unauthorized - missing or invalid authentication token
// - 403: Forbidden - insufficient permissions to create users
// - 409: Conflict - email already exists
// - 500: Internal server error - database connection failure, password hashing failure
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