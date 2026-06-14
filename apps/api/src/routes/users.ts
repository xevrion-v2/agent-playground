import { Router } from "express";

const router = Router();

// TODO: Implement user listing with pagination, filtering, and search
//       - Add query parameters: page, limit, sortBy, sortOrder
//       - Support filtering by role, status, createdAt range
//       - Return total count alongside paginated results
//       - Add error handling for invalid query parameters
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement user creation with full validation
//       - Validate required fields: name, email, password
//       - Validate email format and uniqueness
//       - Hash password before storing
//       - Return 201 with created user (excluding password)
//       - Return 400 for validation errors
//       - Return 409 for duplicate email
//       - Add rate limiting for POST /users
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Implement GET /users/:id — get single user by ID
//       - Return 404 if user not found
//       - Return 400 for invalid ID format

// TODO: Implement PATCH /users/:id — partial user update
//       - Validate updatable fields only
//       - Return 404 if user not found
//       - Return 409 on email conflict

// TODO: Implement DELETE /users/:id — soft or hard delete
//       - Consider soft-delete with deletedAt timestamp
//       - Return 404 if user not found
//       - Return 403 if trying to delete self (prevent orphan data)

export default router;
