import { Router, type Request, type Response } from "express";

import { apiError } from "../lib/apiError";

const router = Router();

// TODO: Replace stub with a paginated query against the `User` table.
// TODO: Support `?limit=&offset=` query params and return total count.
// TODO: Return 401 when the caller is not authenticated.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

// TODO: Persist the created user via Prisma instead of echoing a stub id.
// TODO: Hash/validate passwords if auth is added.
// TODO: On validation failure return 400 (see validateCreateUser).
// TODO: Emit a domain event so the leaderboard can credit the creator.
router.post("/", (req: Request, res: Response) => {
  const result = validateCreateUser(req.body);
  if (!result.ok) {
    return apiError(res, 400, "Invalid user payload. A valid `email` is required.", "INVALID_USER");
  }
  return res.status(201).json({
    data: {
      id: `user_${crypto.randomUUID()}`,
      email: result.email,
      ...(result.name ? { name: result.name } : {}),
    },
    message: "User created.",
  });
});

// Lightweight validation for the user route stubs.
export function validateCreateUser(body: unknown): { ok: true; email: string; name?: string } | { ok: false } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false };
  }
  const b = body as Record<string, unknown>;
  if (typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) {
    return { ok: false };
  }
  const name = typeof b.name === "string" ? b.name.trim() || undefined : undefined;
  return { ok: true, email: b.email.trim(), ...(name ? { name } : {}) };
}

export default router;
