import { Router } from "express";
import { errorResponse } from "../utils/errorResponse";

const router = Router();

// TODO: Replace stub with real database-backed user listing
// TODO: Add pagination support (offset/limit query params)
// TODO: Add filtering by role or status
// TODO: Handle empty result set with appropriate status code
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

// TODO: Validate that req.body.name is a non-empty string
// TODO: Validate that req.body.email is a valid email format
// TODO: Check for duplicate email before creating
// TODO: Return proper 409 Conflict if user already exists
// TODO: Sanitize input to prevent XSS in stored data
router.post("/", (req, res) => {
  // #6 — Lightweight input validation
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json(errorResponse(400, "Field 'name' is required and must be a non-empty string"));
    return;
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json(errorResponse(400, "Field 'email' is required and must be a valid email address"));
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim(),
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
