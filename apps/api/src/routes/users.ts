import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";

const router = Router();

interface CreateUserBody {
  email?: unknown;
  name?: unknown;
}

/** Validate email format */
function isValidEmail(val: unknown): val is string {
  if (typeof val !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

/** Normalize a string: trim, collapse whitespace, title-case */
function normalizeName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0) return null;
  // Title-case each word
  return trimmed.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Normalize email: lowercase + trim */
function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  // -- Reject non-object bodies --
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Request body must be a JSON object.",
    });
    return;
  }

  const body = req.body as Record<string, unknown>;
  const { email, name } = body as CreateUserBody;

  // -- Validate email --
  if (email === undefined) {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "email is required.",
    });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "email must be a valid email address.",
    });
    return;
  }

  // -- Normalize name if provided --
  const normalizedName = name !== undefined ? normalizeName(name) : undefined;

  // -- Build safe payload (server-generated id, ignore extra fields) --
  const user = {
    id: randomUUID(),
    email: normalizeEmail(email),
    ...(normalizedName !== undefined ? { name: normalizedName } : {}),
  };

  res.status(201).json({ data: user, message: "User created." });
});

/** Exported for testing */
export { isValidEmail, normalizeName, normalizeEmail };

export default router;
