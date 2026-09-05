import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface CreateUserInput {
  email: unknown;
  name?: unknown;
}

interface CreateUserOutput {
  id: string;
  email: string;
  name: string;
}

/**
 * Validate & normalise the POST /users request body.
 * Returns a sanitised payload or a 4xx error response.
 */
function parseCreateUserPayload(
  body: unknown
): { ok: true; value: CreateUserInput } | { ok: false; status: number; message: string } {
  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, message: "Request body must be a JSON object." };
  }

  const raw = body as Record<string, unknown>;

  // Require a valid email
  if (typeof raw.email !== "string" || !EMAIL_RE.test(raw.email.trim())) {
    return { ok: false, status: 400, message: "A valid email address is required." };
  }

  const email = raw.email.trim().toLowerCase();

  // Normalise optional name
  let name = "";
  if (raw.name !== undefined && raw.name !== null) {
    if (typeof raw.name !== "string") {
      return { ok: false, status: 400, message: "Name must be a string." };
    }
    name = raw.name.trim();
  }

  return { ok: true, value: { email, name } };
}

/* ------------------------------------------------------------------ */
/*  Route handlers                                                     */
/* ------------------------------------------------------------------ */

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const parsed = parseCreateUserPayload(req.body);

  if (!parsed.ok) {
    res.status(parsed.status).json({ error: parsed.message });
    return;
  }

  // Generate server-side id - ignore any client-controlled id
  const id = crypto.randomUUID();

  // Only return the fields we control
  const user: CreateUserOutput = {
    id,
    email: parsed.value.email,
    name: parsed.value.name,
  };

  res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

export default router;
export { parseCreateUserPayload };
