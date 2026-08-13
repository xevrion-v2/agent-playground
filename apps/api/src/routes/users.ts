import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";

interface CreateUserBody {
  email?: unknown;
  name?: unknown;
  [key: string]: unknown;
}

interface ApiError {
  message: string;
  details?: Record<string, unknown>;
}

const router = Router();

/**
 * Normalize an email: trim + lowercase.
 * Returns `null` when the input cannot be a valid email.
 */
function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().toLowerCase();
  // Basic format check: exactly one "@" with non-empty local and domain parts
  const parts = trimmed.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  if (local.length === 0 || domain.length === 0) return null;
  if (!/^[a-z0-9._%+\-]+$/.test(local)) return null;
  if (!/^[a-z0-9.\-]+\.[a-z]{2,}$/.test(domain)) return null;
  return trimmed;
}

/**
 * Normalize a display name.
 * Returns `null` when the input is unusable.
 */
function normalizeName(raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  if (trimmed.length > 100) return null;
  return trimmed;
}

/**
 * Validate the POST /users request body.
 * Returns `{ ok: true, email, name }` or `{ ok: false, errors }`.
 */
function validateCreateUserBody(
  body: CreateUserBody
): { ok: true; email: string; name: string | null } | { ok: false; errors: ApiError } {
  const errors: string[] = [];

  const email = normalizeEmail(body.email);
  if (email === null) {
    errors.push("email: must be a valid non-empty email address");
  }

  const name = normalizeName(body.name);
  if (body.name !== undefined && name === null) {
    errors.push("name: must be a non-empty string under 100 characters, or omit it");
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors: {
        message: "Invalid user creation payload",
        details: { errors },
      },
    };
  }

  return {
    ok: true,
    email: email!,
    name,
  };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  // Reject non-object bodies
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    res.status(400).json({
      message: "Invalid JSON: request body must be an object",
    });
    return;
  }

  const result = validateCreateUserBody(req.body);
  if (!result.ok) {
    res.status(400).json(result.errors);
    return;
  }

  // Generate a server-side UUID (ignore any client-supplied "id")
  const userId = randomUUID();

  // Build the response from validated + normalized fields only
  const user = {
    id: userId,
    email: result.email,
    ...(result.name !== null ? { name: result.name } : {}),
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    data: user,
    message: "User created (stub — persistence not implemented).",
  });
});

export default router;
