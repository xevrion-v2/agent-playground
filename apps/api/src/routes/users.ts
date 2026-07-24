import { Router } from "express";

type CreateUserBody = {
  email?: unknown;
  name?: unknown;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeOptionalName(value: unknown) {
  if (value === undefined) return undefined;
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function createUserId() {
  return `user_${Date.now().toString(36)}`;
}

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isPlainObject(req.body)) {
    return res.status(400).json({
      error: "User payload must be a JSON object."
    });
  }

  const { email, name } = req.body as CreateUserBody;
  if (typeof email !== "string" || !email.includes("@") || email.length > 320) {
    return res.status(400).json({
      error: "A valid email is required."
    });
  }

  const normalizedName = normalizeOptionalName(name);
  if (name !== undefined && normalizedName === undefined) {
    return res.status(400).json({
      error: "Name must be a non-empty string when provided."
    });
  }

  res.status(201).json({
    data: {
      id: createUserId(),
      email: email.trim().toLowerCase(),
      ...(normalizedName ? { name: normalizedName } : {})
    },
    message: "User created."
  });
});

export default router;
