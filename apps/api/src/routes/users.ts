import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const email = value.trim().toLowerCase();
  return EMAIL_PATTERN.test(email) ? email : null;
}

function normalizeName(value: unknown): { ok: true; value?: string } | { ok: false } {
  if (value === undefined || value === null) {
    return { ok: true, value: undefined };
  }
  if (typeof value !== "string") {
    return { ok: false };
  }
  const name = value.trim().replace(/\s+/g, " ");
  return { ok: true, value: name.length > 0 ? name : undefined };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  if (!isPlainObject(req.body)) {
    return res.status(400).json({
      error: "Request body must be a JSON object.",
    });
  }

  const email = normalizeEmail(req.body.email);
  if (!email) {
    return res.status(400).json({
      error: "A valid email is required.",
    });
  }

  const nameResult = normalizeName(req.body.name);
  if (!nameResult.ok) {
    return res.status(400).json({
      error: "Name must be a string when provided.",
    });
  }

  const user = {
    id: randomUUID(),
    email,
    ...(nameResult.value ? { name: nameResult.value } : {}),
  };

  return res.status(201).json({
    data: user,
    message: "User created.",
  });
});

export default router;
