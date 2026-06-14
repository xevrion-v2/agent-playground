import { Router, Request, Response } from "express";

const router = Router();

// Validation helpers (no external dependencies)

interface ValidationError {
  field: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  // Basic email format check: something@something.something
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidUsername(username: string): boolean {
  // Username must be 3-30 characters, alphanumeric with underscores/hyphens
  if (typeof username !== "string") return false;
  const trimmed = username.trim();
  if (trimmed.length < 3 || trimmed.length > 30) return false;
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  return usernameRegex.test(trimmed);
}

function validateUser(body: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate email
  if (!body.email || typeof body.email !== "string") {
    errors.push({ field: "email", message: "Email is required and must be a string." });
  } else if (!isValidEmail(body.email)) {
    errors.push({ field: "email", message: "Email must be a valid email address." });
  }

  // Validate username
  if (!body.username || typeof body.username !== "string") {
    errors.push({ field: "username", message: "Username is required and must be a string." });
  } else if (!isValidUsername(body.username)) {
    errors.push({
      field: "username",
      message: "Username must be 3-30 characters long and contain only letters, numbers, underscores, or hyphens.",
    });
  }

  return errors;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const errors = validateUser(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "One or more fields are invalid.",
      details: errors,
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email: req.body.email,
      username: req.body.username,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
