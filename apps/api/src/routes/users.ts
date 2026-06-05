import { Router } from "express";

const router = Router();

// TODO: Implement pagination (page, limit query params) with default values
// TODO: Add filtering by role, skills, and availability status
// TODO: Return 401 if no valid auth token is present
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body with Zod schema (email required, valid format)
// TODO: Hash password with bcrypt before storing
// TODO: Return 409 Conflict if email already exists
// TODO: Return 400 with validation error details for invalid input
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