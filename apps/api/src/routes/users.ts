import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

type UserCreationPayload = Record<string, unknown>;

type NormalizedUser = {
  id: string;
  email: string;
  name?: string;
};

type UserCreationResult =
  | { ok: true; user: NormalizedUser }
  | { ok: false; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPayloadObject(payload: unknown): payload is UserCreationPayload {
  return payload !== null && typeof payload === "object" && !Array.isArray(payload);
}

function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeUserCreationPayload(
  payload: unknown,
  generateId: () => string = randomUUID
): UserCreationResult {
  if (!isPayloadObject(payload)) {
    return { ok: false, message: "User payload must be a JSON object." };
  }

  const rawEmail = payload.email;

  if (typeof rawEmail !== "string") {
    return { ok: false, message: "A valid email is required." };
  }

  const email = rawEmail.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "A valid email is required." };
  }

  const user: NormalizedUser = {
    id: generateId(),
    email
  };

  if (typeof payload.name === "string") {
    const name = normalizeWhitespace(payload.name);

    if (name.length > 0) {
      user.name = name;
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
  const result = normalizeUserCreationPayload(req.body);

  if (!result.ok) {
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
