import { Router } from "express";

const router = Router();

// TODO: Add pagination support (query params: page, limit, sort, filter)
// TODO: Add authentication/authorization middleware to verify user session
// TODO: Return 401 for unauthenticated requests
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body against a UserSchema (name, email, role required)
// TODO: Return 400 with field-level error details for invalid input
// TODO: Hash password field before persisting to database
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Add GET /:id — fetch single user by ID, return 404 if not found
// TODO: Add PUT /:id — full update; require all fields, return 400 on validation failure
// TODO: Add PATCH /:id — partial update; merge with existing fields
// TODO: Add DELETE /:id — soft-delete (set deletedAt) or hard-delete; return 204 on success

export default router;
