import { Router, type Request, type Response } from "express";

const router = Router();

// --- Validation helpers (server-side, never trust client) ---

// RFC 5322 simplified email check — good enough for input validation here.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function normalizeName(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  return trimmed.slice(0, 120);
}

function validateUserInput(body: unknown): {
  ok: boolean;
  error?: string;
  email?: string;
  name?: string;
} {
  // Reject non-object bodies (including arrays, null, primitives).
  if (!isPlainObject(body)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const rawEmail = body.email;
  if (typeof rawEmail !== "string" || !EMAIL_RE.test(rawEmail.trim())) {
    return { ok: false, error: "A valid email is required." };
  }

  const name = normalizeName(body.name);
  return {
    ok: true,
    email: rawEmail.trim(),
    name,
  };
}

// In a real deployment this would persist via Prisma. We keep the stub
// contract (201 + envelope) but enforce server-generated id + field control.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const result = validateUserInput(req.body);

  if (!result.ok) {
    return res.status(400).json({
      data: null,
      error: result.error,
    });
  }

  // Server-generated id — client-supplied `id` (or any unrelated field) is ignored.
  const user = {
    id: `user_${crypto.randomUUID()}`,
    email: result.email,
    ...(result.name ? { name: result.name } : {}),
  };

  return res.status(201).json({
    data: user,
    message: "User created.",
  });
});

export default router;
export { validateUserInput };
