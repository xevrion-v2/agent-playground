import { Router, Request, Response } from "express";

const router = Router();

// Email validation regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CreateUserInput {
  email: string;
  name?: string;
}

interface ValidatedUser {
  id: string;
  email: string;
  name?: string;
}

/**
 * Validates and normalizes user creation input
 */
function validateUserInput(body: unknown): { success: true; data: ValidatedUser } | { success: false; error: string } {
  // Reject undefined/null bodies
  if (body === undefined || body === null) {
    return { success: false, error: "Request body must be a JSON object" };
  }

  // Reject non-object bodies (arrays, strings, numbers, etc.)
  if (typeof body !== "object" || Array.isArray(body)) {
    return { success: false, error: "Request body must be a JSON object" };
  }

  const input = body as Record<string, unknown>;

  // Require email
  if (input.email === undefined || input.email === null || typeof input.email !== "string") {
    return { success: false, error: "Email is required and must be a string" };
  }

  // Validate email format
  const email = input.email.trim().toLowerCase();
  if (email.length === 0 || !EMAIL_REGEX.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // Build validated user (ignore client-controlled id and unrelated fields)
  const validatedUser: ValidatedUser = {
    id: generateUserId(),
    email: email,
  };

  // Normalize optional name
  if (input.name !== undefined) {
    if (typeof input.name !== "string") {
      return { success: false, error: "Name must be a string" };
    }
    const normalizedName = input.name.trim();
    if (normalizedName.length > 0) {
      validatedUser.name = normalizedName;
    }
  }

  return { success: true, data: validatedUser };
}

/**
 * Generate a server-side user ID (UUID v4 format)
 */
function generateUserId(): string {
  // Simple UUID v4 generation
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const result = validateUserInput(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error,
    });
  }

  res.status(201).json({
    data: result.data,
    message: "User created successfully",
  });
});

export default router;
