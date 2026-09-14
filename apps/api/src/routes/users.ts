import { Router } from "express";

const router = Router();

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email } = req.body || {};

  // Validate email: must be a non-empty valid email string
  if (typeof email !== "string" || email.trim() === "" || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "A valid non-empty email is required.",
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
