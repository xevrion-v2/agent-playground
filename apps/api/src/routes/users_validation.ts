import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Create a new user with input validation.
 * Validates that name and email are present and non-empty.
 */
router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Name is required and must be a non-empty string."
    });
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      error: "Validation Error",
      message: "A valid email is required."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
