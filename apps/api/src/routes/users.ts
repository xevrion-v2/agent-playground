import { Router } from "express";

const router = Router();

// TODO: Implement pagination with query params (page, limit)
// TODO: Add filtering by role, skills, and status
// TODO: Return proper error when database is unreachable
// TODO: Add sorting options (by name, created date, rating)
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body against User schema (email required, valid format)
// TODO: Hash password before storing
// TODO: Check for duplicate email and return 409 Conflict
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

export default router;
