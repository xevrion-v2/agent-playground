import { Router, Request, Response } from "express";

const router = Router();

// Validation helpers (no external dependencies)

interface ValidationError {
  field: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

function normalizeUserInput(body: Record<string, unknown>) {
  return {
    email: typeof body.email === "string" ? body.email.trim() : undefined,
    username: typeof body.username === "string" ? body.username.trim() : undefined,
  };
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

// In-memory user store
let users: User[] = [];
let nextId = 1;

function generateId(): string {
  return `user-${nextId++}`;
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: users,
    total: users.length,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({
      error: "Not found",
      message: `User with id '${req.params.id}' not found.`,
    });
  }
  res.json({ data: user });
});

router.post("/", (req: Request, res: Response) => {
  const errors = validateUser(req.body);
  const normalized = normalizeUserInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "One or more fields are invalid.",
      details: errors,
    });
  }

  // Check for duplicate email
  const existingEmail = users.find((u) => u.email === normalized.email);
  if (existingEmail) {
    return res.status(409).json({
      error: "Conflict",
      message: "A user with this email already exists.",
    });
  }

  // Check for duplicate username
  const existingUsername = users.find((u) => u.username === normalized.username);
  if (existingUsername) {
    return res.status(409).json({
      error: "Conflict",
      message: "A user with this username already exists.",
    });
  }

  const newUser: User = {
    id: generateId(),
    email: normalized.email!,
    username: normalized.username!,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).json({
    data: newUser,
    message: "User created successfully.",
  });
});

router.delete("/:id", (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: "Not found",
      message: `User with id '${req.params.id}' not found.`,
    });
  }
  const deleted = users.splice(index, 1)[0];
  res.json({ data: deleted, message: "User deleted successfully." });
});

export { isValidEmail, isValidUsername, validateUser, users };
export default router;
