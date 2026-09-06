import { Router } from "express";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserBody = {
  email?: unknown;
  name?: unknown;
};

function validateCreateUserPayload(
  body: unknown,
): { ok: true; value: { email: string; name?: string } } | { ok: false; error: string } {
  if (body === undefined || body === null) {
    return { ok: false, error: "request body is required" };
  }
  if (typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "request body must be a JSON object" };
  }
  const { email, name } = body as CreateUserBody;

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return { ok: false, error: "field 'email' is required and must be a valid email address" };
  }

  const normalized: { email: string; name?: string } = { email: email.trim().toLowerCase() };

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return { ok: false, error: "field 'name' must be a non-empty string when provided" };
    }
    normalized.name = name.trim();
  }

  return { ok: true, value: normalized };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = validateCreateUserPayload(req.body);
  if (!result.ok) {
    return res.status(400).json({
      status: "error",
      data: null,
      message: result.error
    });
  }
  const id = `usr_${Math.random().toString(36).slice(2, 10)}`;
  res.status(201).json({
    status: "ok",
    data: {
      id,
      email: result.value.email,
      ...(result.value.name !== undefined ? { name: result.value.name } : {})
    },
    message: "User creation accepted."
  });
});

export default router;
