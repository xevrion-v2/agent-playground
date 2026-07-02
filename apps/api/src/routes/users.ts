import { Router } from "express";
import crypto from "node:crypto";

const router = Router();

type CreateUserPayload = {
  email?: unknown;
  name?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isPlainObject = (value: unknown): value is CreateUserPayload =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeText = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > 0 ? normalized : undefined;
};

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isPlainObject(req.body)) {
    res.status(400).json({
      error: "Request body must be a JSON object."
    });
    return;
  }

  const email = normalizeText(req.body.email)?.toLowerCase();

  if (!email || !emailPattern.test(email)) {
    res.status(400).json({
      error: "A valid email is required."
    });
    return;
  }

  const name = normalizeText(req.body.name);

  res.status(201).json({
    data: {
      id: crypto.randomUUID(),
      email,
      ...(name ? { name } : {})
    },
    message: "User created."
  });
});

export default router;
