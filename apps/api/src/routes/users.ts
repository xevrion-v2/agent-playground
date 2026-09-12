import { Router } from "express";

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeName(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeEmail(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : undefined;
}

function generateUserId(): string {
  return `user_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  if (!isPlainObject(body)) {
    return res.status(400).json({
      error: "Invalid request body. Expected a JSON object."
    });
  }

  const email = normalizeEmail(body.email);

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      error: "A valid email is required."
    });
  }

  const name = normalizeName(body.name);

  const user: { id: string; email: string; name?: string } = {
    id: generateUserId(),
    email
  };

  if (name !== undefined) {
    user.name = name;
  }

  return res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

export default router;