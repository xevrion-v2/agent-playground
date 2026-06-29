import { Router } from "express";
import { randomUUID } from "crypto";

const router = Router();

/**
 * Simple but robust email regex: requires local@domain.tld structure
 * with no whitespace in any segment.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  // 1. Reject non-object bodies (arrays, strings, null, numbers…)
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  // 2. Require a valid email
  const rawEmail: unknown = body.email;
  if (typeof rawEmail !== "string" || !EMAIL_RE.test(rawEmail.trim())) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  // 3. Normalize: trim + lowercase email; trim optional name
  const email = rawEmail.trim().toLowerCase();
  const name: string | undefined =
    typeof body.name === "string" ? body.name.trim() : undefined;

  // 4. Generate server-side ID — any client-supplied id is silently discarded.
  //    Extra fields are excluded by only spreading what we explicitly built above.
  const id = randomUUID();
  const user = name !== undefined ? { id, email, name } : { id, email };

  return res.status(201).json({ data: user, message: "User created." });
});

export default router;
