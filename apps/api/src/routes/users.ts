import { Router } from "express";

const router = Router();

// TODO: Implement GET /users endpoint
// - Add pagination support (limit, offset query params)
// - Add filtering by role, status, or search term
// - Return user list with sanitized fields (exclude password hash)
// - Handle database errors with appropriate 500 response
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement POST /users endpoint for user creation
// - Validate required fields (email, password, name) with Zod schema
// - Check for duplicate email and return 409 Conflict if exists
// - Hash password before storing
// - Create user record in database
// - Return created user with sanitized fields (exclude password hash)
// - Handle validation errors with 400 Bad Request
// - Handle database errors with appropriate 500 response
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
