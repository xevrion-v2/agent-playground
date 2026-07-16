import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return null;
  }

  return normalized;
}

function normalizeOptionalName(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isPlainObject(req.body)) {
    res.status(400).json({
      error: "Validation failed",
      details: {
        body: ["Request body must be a JSON object."]
      }
    });
    return;
  }

  const email = normalizeEmail(req.body.email);

  if (!email) {
    res.status(400).json({
      error: "Validation failed",
      details: {
        email: ["A valid email address is required."]
      }
    });
    return;
  }

  const user = {
    id: randomUUID(),
    email,
  };

  const name = normalizeOptionalName(req.body.name);

  if (name) {
    user.name = name;
  }

  res.status(201).json({
    data: user,
    message: "User created"
  });
});

export default router;
