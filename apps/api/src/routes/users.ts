import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

// Reasonably strict email regex (RFC 5322 simplified).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeName(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0) return undefined;
  return trimmed.slice(0, MAX_NAME_LENGTH);
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (!isPlainObject(body)) {
    return res.status(400).json({
      error: "Invalid request body. Expected a JSON object."
    });
  }

  const rawEmail = body.email;
  if (typeof rawEmail !== "string") {
    return res.status(400).json({
      error: "A valid 'email' string is required."
    });
  }

  const email = rawEmail.trim().toLowerCase();
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      error: "A valid 'email' string is required."
    });
  }

  const name = normalizeName(body.name);

  // Server generates the id; client-controlled `id` and any other
  // extra fields on the request body are intentionally ignored.
  const user: { id: string; email: string; name?: string } = {
    id: randomUUID(),
    email
  };
  if (name !== undefined) {
    user.name = name;
  }

  return res.status(201).json({
    data: user,
    message: "User created."
  });
});

export default router;
