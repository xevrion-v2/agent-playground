import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

interface UserInput {
  email?: string;
  name?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// In-memory user store (replace with DB in production)
const users: User[] = [];

/**
 * Validates and normalizes a user creation payload.
 * Returns { user, errors } where errors is null on success.
 */
export function validateUserPayload(body: unknown): { user?: UserInput; errors?: string[] } {
  const errors: string[] = [];

  // 1. Reject non-object JSON bodies
  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) {
    return { errors: ["Request body must be a JSON object"] };
  }

  const input = body as Record<string, unknown>;

  // 2. Require a valid email
  if (!input.email || typeof input.email !== "string") {
    errors.push("Email is required and must be a string");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.push("Email must be a valid email address");
    }
  }

  // 3. Validate name if provided
  if (input.name !== undefined && input.name !== null) {
    if (typeof input.name !== "string") {
      errors.push("Name must be a string if provided");
    } else if (input.name.trim().length === 0) {
      errors.push("Name must not be empty if provided");
    }
  }

  if (errors.length > 0) {
    return { errors };
  }

  // 4. Normalize email/name values
  const user: UserInput = {
    email: (input.email as string).trim().toLowerCase(),
    name: input.name ? (input.name as string).trim() : undefined,
  };

  return { user };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: users,
    message: `Found ${users.length} users`,
  });
});

router.post("/", (req: Request, res: Response) => {
  const { user, errors } = validateUserPayload(req.body);

  if (errors) {
    res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
    return;
  }

  // Generate server-side ID — ignore any client-provided id
  const newUser: User = {
    id: crypto.randomUUID(),
    email: user!.email,
    name: user!.name || user!.email.split("@")[0],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).json({
    data: newUser,
    message: "User created successfully",
  });
});

export default router;
