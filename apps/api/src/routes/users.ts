import { Router } from "express";
import { randomUUID } from "crypto";

const router = Router();

/**
 * Validates and normalizes an email address.
 * Returns the normalized email (trimmed, lowercase) or null if invalid.
 */
function validateEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;

  const trimmed = email.trim().toLowerCase();
  if (trimmed.length === 0) return null;

  // RFC 5322 compliant email regex (simplified practical version)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return null;

  return trimmed;
}

/**
 * Normalizes a name string: trims whitespace, collapses multiple spaces.
 * Returns null if the value is not a string or is empty after trimming.
 */
function normalizeName(name: unknown): string | null {
  if (typeof name !== "string") return null;

  const trimmed = name.trim().replace(/\s+/g, " ");
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Sanitizes user input by extracting only allowed fields and applying
 * validation/normalization rules.
 *
 * Allowed fields: email (required), name (optional)
 * Ignored fields: id, and any other unrelated fields
 */
function sanitizeUserInput(body: unknown): {
  email: string;
  name?: string;
} | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }

  const input = body as Record<string, unknown>;

  // Email is required
  const email = validateEmail(input.email);
  if (email === null) {
    return null;
  }

  const result: { email: string; name?: string } = { email };

  // Name is optional but must be normalized if present
  const name = normalizeName(input.name);
  if (name !== null) {
    result.name = name;
  }

  return result;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const sanitized = sanitizeUserInput(req.body);

  if (sanitized === null) {
    res.status(400).json({
      error: "Invalid user payload. Expected an object with a valid 'email' field. "
           + "Optional 'name' field must be a non-empty string.",
    });
    return;
  }

  // Generate server-side ID; ignore any client-provided id
  const user = {
    id: randomUUID(),
    email: sanitized.email,
    ...(sanitized.name !== undefined && { name: sanitized.name }),
  };

  res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

export default router;

// Export internals for testing
export { sanitizeUserInput, validateEmail, normalizeName };
