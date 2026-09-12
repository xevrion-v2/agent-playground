import { Router } from "express";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserInput = {
  email: string;
  name: string;
};

type ValidationResult =
  | { ok: true; value: CreateUserInput }
  | { ok: false; error: string };

export function validateCreateUserPayload(body: unknown): ValidationResult {
  if (body === null || Array.isArray(body) || typeof body !== "object") {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const payload = body as Record<string, unknown>;

  if (typeof payload.name !== "string" || payload.name.trim() === "") {
    return { ok: false, error: "A non-empty name is required." };
  }

  if (typeof payload.email !== "string" || !EMAIL_RE.test(payload.email.trim())) {
    return { ok: false, error: "A valid email is required." };
  }

  return {
    ok: true,
    value: {
      name: payload.name.trim(),
      email: payload.email.trim()
    }
  };
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
    return res.status(400).json({ error: result.error });
  }

  return res.status(201).json({
    data: {
      id: "stub-user-id",
      ...result.value
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
