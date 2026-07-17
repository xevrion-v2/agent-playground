import { Router, type Request, type Response } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

// Pragmatic, dependency-free email shape check. Intentionally not RFC-perfect;
// it blocks malformed input while accepting normal addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type UserCreationInput = { email: string; name?: string };

/**
 * Thrown when a user-creation payload fails validation. The message is safe to
 * surface to the client.
 */
export class UserValidationError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "UserValidationError";
  }
}

/**
 * Validate and normalize a user-creation payload.
 *
 * - Rejects non-object / array / null JSON bodies.
 * - Requires a syntactically valid email.
 * - Normalizes email (trim + lowercase) and optional name (trim + collapse runs of whitespace).
 * - Deliberately ignores any client-controlled `id` and unrelated fields.
 *
 * @throws {UserValidationError} when the input is invalid.
 */
export function validateUserCreationInput(body: unknown): UserCreationInput {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    throw new UserValidationError("Request body must be a JSON object.");
  }
  const record = body as Record<string, unknown>;

  const rawEmail = record["email"];
  if (typeof rawEmail !== "string" || rawEmail.trim() === "") {
    throw new UserValidationError("A valid email is required.");
  }
  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    throw new UserValidationError("Email format is invalid.");
  }

  let name: string | undefined;
  const rawName = record["name"];
  if (rawName !== undefined && rawName !== null) {
    if (typeof rawName !== "string") {
      throw new UserValidationError("Name must be a string when provided.");
    }
    const normalized = rawName.replace(/\s+/g, " ").trim();
    if (normalized.length > 0) name = normalized;
  }

  // The server owns identity: ignore `id` and any other client-supplied fields.
  return { email, name };
}

/**
 * GET /users — list users (not implemented yet).
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users — create a user from a validated, server-normalized payload.
 *
 * Ids are generated server-side; clients cannot choose them, and unknown
 * fields are dropped.
 */
export function handleUserCreation(req: Request, res: Response) {
  try {
    const input = validateUserCreationInput(req.body);
    res.status(201).json({
      data: {
        id: randomUUID(),
        email: input.email,
        ...(input.name ? { name: input.name } : {})
      },
      message: "User created."
    });
  } catch (err) {
    if (err instanceof UserValidationError) {
      res.status(400).json({ error: err.reason, message: "Invalid user creation payload." });
      return;
    }
    res.status(500).json({ error: "Internal error", message: "User creation failed." });
  }
}

router.post("/", handleUserCreation);

export default router;
