import { Router } from "express";
import { randomUUID } from "crypto";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalize a string value: trim whitespace and strip control characters.
 */
function normalizeString(value: string): string {
  return value
    .replace(/[\x00-\x1f\x7f]/g, "")
    .trim();
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Reject non-object JSON bodies (arrays, strings, numbers, booleans, null)
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "Request body must be a JSON object."
    });
  }

  const { email, name } = req.body;

  // Require a valid email
  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
      error: "A valid email is required."
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_RE.test(normalizedEmail)) {
    return res.status(400).json({
      error: "The email address is not valid."
    });
  }

  // Normalize name if provided
  const normalizedName = typeof name === "string" ? normalizeString(name) : undefined;

  // Build response — server-generated id, only email/name, no client-controlled fields
  res.status(201).json({
    data: {
      id: randomUUID(),
      email: normalizedEmail,
      ...(normalizedName !== undefined ? { name: normalizedName } : {})
    },
    message: "User created."
  });
});

export default router;
