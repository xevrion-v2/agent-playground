import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

type CreatedUser = {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
};

type UserCreationResult =
  | { ok: true; user: CreatedUser }
  | { ok: false; message: string };

type UserCreationError = Extract<UserCreationResult, { ok: false }>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameFields = ["name", "firstName", "lastName"] as const;

function isPlainJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function readOptionalText(
  body: Record<string, unknown>,
  key: (typeof nameFields)[number]
): string | undefined | UserCreationError {
  const value = body[key];

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return {
      ok: false,
      message: `${key} must be a string when provided.`
    };
  }

  const normalized = normalizeText(value);
  return normalized === "" ? undefined : normalized;
}

function isUserCreationError(
  value: string | undefined | UserCreationError
): value is UserCreationError {
  return typeof value === "object";
}

export function createUserFromPayload(
  body: unknown,
  generateId: () => string = randomUUID
): UserCreationResult {
  if (!isPlainJsonObject(body)) {
    return {
      ok: false,
      message: "Request body must be a JSON object."
    };
  }

  if (typeof body.email !== "string") {
    return {
      ok: false,
      message: "A valid email is required."
    };
  }

  const email = normalizeText(body.email).toLowerCase();
  if (!emailRegex.test(email)) {
    return {
      ok: false,
      message: "A valid email is required."
    };
  }

  const user: CreatedUser = {
    id: generateId(),
    email
  };

  for (const field of nameFields) {
    const value = readOptionalText(body, field);
    if (isUserCreationError(value)) {
      return value;
    }
    if (value !== undefined) {
      user[field] = value;
    }
  }

  return { ok: true, user };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = createUserFromPayload(req.body);

  if (result.ok === false) {
    res.status(400).json({
      error: result.message
    });
    return;
  }

  res.status(201).json({
    data: result.user,
    message: "User creation is not implemented yet."
  });
});

export default router;
