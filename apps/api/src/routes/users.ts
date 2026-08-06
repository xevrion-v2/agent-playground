import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

type UserCreatePayload = {
  email?: unknown;
  name?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is UserCreatePayload {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeOptionalString(value: unknown) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed.length > 0 ? trimmed : undefined;
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
      error: {
        code: "invalid_body",
        message: "User creation requires a JSON object body."
      }
    });
    return;
  }

  const normalizedEmail = normalizeOptionalString(req.body.email);

  if (typeof normalizedEmail !== "string" || !emailPattern.test(normalizedEmail)) {
    res.status(400).json({
      error: {
        code: "invalid_email",
        message: "User creation requires a valid email address."
      }
    });
    return;
  }

  const normalizedName = normalizeOptionalString(req.body.name);

  if (normalizedName === null) {
    res.status(400).json({
      error: {
        code: "invalid_name",
        message: "Name must be a string when provided."
      }
    });
    return;
  }

  const data: { id: string; email: string; name?: string } = {
    id: randomUUID(),
    email: normalizedEmail.toLowerCase()
  };

  if (normalizedName) {
    data.name = normalizedName;
  }

  res.status(201).json({
    data,
    message: "User creation is not implemented yet."
  });
});

export default router;
