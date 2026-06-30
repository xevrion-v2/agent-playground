import { Router, Request, Response } from "express";

const router = Router();

interface CreateUserPayload {
  email?: unknown;
  name?: unknown;
}

interface UserResponse {
  id: string;
  email: string;
  name?: string;
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  // Trim whitespace first, then validate
  const trimmed = value.trim();
  // Basic email regex — checks for local-part@domain.tld
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function isValidName(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  // 1. Reject non-object JSON bodies (arrays, primitives)
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    res.status(400).json({
      error: "Invalid request body — expected a JSON object.",
    });
    return;
  }

  const { email, name } = req.body as CreateUserPayload;

  // 2. Require a valid email
  if (!isValidEmail(email)) {
    res.status(400).json({
      error: "A valid email address is required.",
    });
    return;
  }

  // 3. Build the user response — only email and name, ignore extra fields
  const user: UserResponse = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    email: email.toLowerCase().trim(),
  };

  // 4. Normalize optional name
  if (isValidName(name)) {
    user.name = name.trim().replace(/\s+/g, " ");
  }

  res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

export default router;
