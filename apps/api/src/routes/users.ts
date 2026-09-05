import { Router, type Request, type Response } from "express";

const router = Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserPayload = {
  name: string;
  email: string;
};

type ValidationResult =
  | { ok: true; value: CreateUserPayload }
  | { ok: false; error: string };

export const validateCreateUserPayload = (body: unknown): ValidationResult => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Request body must be an object." };
  }

  const { name, email } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) {
    return { ok: false, error: "name must be a non-empty string." };
  }
  if (typeof email !== "string" || !email.trim()) {
    return { ok: false, error: "email must be a non-empty string." };
  }

  const normalizedEmail = email.trim();
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return { ok: false, error: "email must be a valid email address." };
  }

  return {
    ok: true,
    value: {
      name: name.trim(),
      email: normalizedEmail,
    },
  };
};

export const createUserHandler = (req: Request, res: Response) => {
  const validation = validateCreateUserPayload(req.body);
  if (validation.ok === false) {
    return res.status(400).json({ error: validation.error });
  }

  return res.status(201).json({
    data: {
      id: "stub-user-id",
      ...validation.value,
    },
    message: "User creation is not implemented yet.",
  });
};

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", createUserHandler);

export default router;
