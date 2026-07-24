import { randomUUID } from "node:crypto";

import { Router } from "express";

const router = Router();

type CreateUserPayload = {
  email: string;
  name?: string;
};

type ValidationResult =
  | {
      ok: true;
      value: CreateUserPayload;
    }
  | {
      ok: false;
      error: string;
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeString = (
  value: unknown,
  fieldName: string
): ValidationResult | string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return {
      ok: false,
      error: `${fieldName} must be a string.`
    };
  }

  const normalized = value.trim().replace(/\s+/g, " ");

  return normalized.length > 0 ? normalized : undefined;
};

export const normalizeCreateUserPayload = (body: unknown): ValidationResult => {
  if (!isRecord(body)) {
    return {
      ok: false,
      error: "Request body must be a JSON object."
    };
  }

  const normalizedEmail = normalizeString(body.email, "email");

  if (typeof normalizedEmail !== "string") {
    return normalizedEmail ?? { ok: false, error: "email is required." };
  }

  const email = normalizedEmail.toLowerCase();

  if (!emailPattern.test(email)) {
    return {
      ok: false,
      error: "email must be a valid email address."
    };
  }

  const normalizedName = normalizeString(body.name, "name");

  if (typeof normalizedName !== "string" && normalizedName !== undefined) {
    return normalizedName;
  }

  return {
    ok: true,
    value: {
      email,
      ...(normalizedName ? { name: normalizedName } : {})
    }
  };
};

export const createUserRecord = (
  payload: CreateUserPayload,
  generateId: () => string = randomUUID
) => ({
  id: generateId(),
  ...payload
});

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const parsed = normalizeCreateUserPayload(req.body);

  if (!parsed.ok) {
    return res.status(400).json({
      error: parsed.error
    });
  }

  res.status(201).json({
    data: createUserRecord(parsed.value),
    message: "User created."
  });
});

export default router;
