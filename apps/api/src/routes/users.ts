import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();
const allowedCreateUserFields = new Set(["email", "name"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserData = {
  email: string;
  name?: string;
};

type ValidationResult =
  | { ok: true; data: CreateUserData }
  | { ok: false; error: string; fields?: string[] };

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateCreateUserPayload(body: unknown): ValidationResult {
  if (!isJsonObject(body)) {
    return {
      error: "Request body must be a JSON object.",
      ok: false
    };
  }

  const unknownFields = Object.keys(body).filter((field) => !allowedCreateUserFields.has(field));
  if (unknownFields.length > 0) {
    return {
      error: "Request body contains unknown fields.",
      fields: unknownFields,
      ok: false
    };
  }

  const rawEmail = body.email;
  if (typeof rawEmail !== "string") {
    return {
      error: "email is required.",
      ok: false
    };
  }

  const email = rawEmail.trim().toLowerCase();
  if (!emailPattern.test(email)) {
    return {
      error: "email must be valid.",
      ok: false
    };
  }

  const rawName = body.name;
  if (rawName !== undefined && typeof rawName !== "string") {
    return {
      error: "name must be a string when provided.",
      ok: false
    };
  }

  const name = rawName?.trim();
  return {
    data: {
      email,
      ...(name ? { name } : {})
    },
    ok: true
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const validation = validateCreateUserPayload(req.body);
  if (!validation.ok) {
    res.status(400).json({
      error: validation.error,
      ...(validation.fields ? { fields: validation.fields } : {})
    });
    return;
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...validation.data
    },
    message: "User created."
  });
});

export default router;
