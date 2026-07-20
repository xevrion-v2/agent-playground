import { Router } from "express";

const router = Router();

// TODO(#10): Implement pagination with query params (page, limit)
// TODO(#10): Add authentication middleware to verify JWT token
// TODO(#10): Filter response fields based on user permissions
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
    // TODO(#10): Return paginated user list with:
    // - data: User[] (id, name, email, createdAt)
    // - pagination: { page, limit, total, hasMore }
    // Error cases:
    // - 401 if not authenticated
    // - 403 if not authorized
    // - 500 on database error
  });
});

// TODO(#10): Add request body validation (zod/joi schema)
// TODO(#10): Check for duplicate email before creation
// TODO(#10): Hash password if provided
// TODO(#10): Return 201 with Location header
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
    // TODO(#10): Return created user with:
    // - data: { id, name, email, createdAt }
    // - Do NOT include password in response
    // Error cases:
    // - 400 if validation fails (missing name/email, invalid email)
    // - 409 if email already exists
    // - 500 on database error
  });
});

// TODO(#10): Add GET /users/:id — fetch single user
// TODO(#10): Add PUT /users/:id — update user
// TODO(#10): Add DELETE /users/:id — soft delete user
// TODO(#10): Add POST /users/login — authenticate user
// TODO(#10): Add POST /users/logout — invalidate session

export default router;
