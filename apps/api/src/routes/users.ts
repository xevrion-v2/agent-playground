import { Router } from "express";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUserPayload(body: unknown): { valid: true } | { valid: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be an object." };
  }

  const { name, email } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return { valid: false, error: "name must be a non-empty string." };
  }

  if (typeof email !== "string" || email.trim().length === 0) {
    return { valid: false, error: "email must be a non-empty string." };
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return { valid: false, error: "email must be a valid email address." };
  }

  return { valid: true };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const validation = validateUserPayload(req.body);

  if (!validation.valid) {
    res.status(400).json({
      error: validation.error
    });
    return;
  }

  const { name, email } = req.body as { name: string; email: string };

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
