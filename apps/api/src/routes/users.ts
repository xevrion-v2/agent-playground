import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserInput = {
  email: string;
  name?: string;
};

type ValidationResult =
  | { ok: true; value: CreateUserInput }
  | { ok: false; error: string };

export function validateCreateUserPayload(body: unknown): ValidationResult {
  if (body === null || Array.isArray(body) || typeof body !== "object") {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const payload = body as Record<string, unknown>;
  if (typeof payload.email !== "string") {
    return { ok: false, error: "A valid email is required." };
  }

  const email = payload.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }

  const value: CreateUserInput = { email };
  if (payload.name !== undefined) {
    if (typeof payload.name !== "string") {
      return { ok: false, error: "Name must be a string when provided." };
    }

    const name = payload.name.trim();
    if (name) {
      value.name = name;
    }
  }

  return { ok: true, value };
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
      error: result.error
    });
  }

  return res.status(201).json({
    data: {
      id: randomUUID(),
      ...result.value
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
