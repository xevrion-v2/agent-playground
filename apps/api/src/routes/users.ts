import { Router } from "express";

const router = Router();

// TODO: Implement pagination with query params (?page=1&limit=20)
// TODO: Add filtering by role, skill, and status (?role=freelancer&skill=react)
// TODO: Return proper 500 error response when database query fails
// TODO: Add rate limiting (max 100 req/min per IP)
// TODO: Validate query params with Zod schema before processing
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body with Zod schema (name, email, role required)
// TODO: Hash passwords with bcrypt before storing (never store plaintext)
// TODO: Return 409 Conflict when email is already registered
// TODO: Send welcome email via email service after successful creation
// TODO: Log user creation event to audit trail
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Implement GET /users/:id with 404 for missing users
// TODO: Add PATCH /users/:id for partial profile updates with auth guard
// TODO: Add DELETE /users/:id (soft delete) restricted to admin role
// TODO: Add GET /users/:id/tasks for fetching tasks assigned to a user
// TODO: Add GET /users/:id/reviews for fetching reviews about a user

export default router;
