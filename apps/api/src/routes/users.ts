import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";

const router = Router();

interface CreateUserPayload {
  email?: unknown;
  name?: unknown;
  [key: string]: unknown;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

// GET /users - list users (stub)
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

// POST /users - create user with validation
router.post("/", (req: Request, res: Response) => {
  const body = req.body;

  // Reject non-object JSON bodies
  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({
      error: "Request body must be a JSON object",
    });
    return;
  }

  const payload = body as Record<string, unknown>;

  // Require a valid email
  if (payload.email === undefined || payload.email === null) {
    res.status(400).json({
      error: "email is required",
    });
    return;
  }

  if (typeof payload.email !== "string") {
    res.status(400).json({
      error: "email must be a string",
    });
    return;
  }

  const normalizedEmail = normalizeEmail(payload.email);

  if (!isValidEmail(normalizedEmail)) {
    res.status(400).json({
      error: "email must be a valid email address",
    });
    return;
  }

  // Normalize name if provided
  let normalizedName: string | undefined;
  if (payload.name !== undefined && payload.name !== null) {
    if (typeof payload.name !== "string") {
      res.status(400).json({
        error: "name must be a string",
      });
      return;
    }
    normalizedName = normalizeName(payload.name);
  }

  // Build user object - ignore client-controlled id and unrelated fields
  const user = {
    id: randomUUID(),
    email: normalizedEmail,
  };

  if (normalizedName !== undefined) {
    (user as Record<string, unknown>).name = normalizedName;
  }

  res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

export default router;