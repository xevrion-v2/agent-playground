import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameFields = ["name", "firstName", "lastName"] as const;

type NameField = (typeof nameFields)[number];
type CreatedUser = {
  id: string;
  email: string;
} & Partial<Record<NameField, string>>;

type UserPayloadResult =
  | { user: CreatedUser; error?: never }
  | { user?: never; error: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeUserCreationPayload(body: unknown): UserPayloadResult {
  if (!isPlainObject(body)) {
    return { error: "Request body must be a JSON object." };
  }

  if (typeof body.email !== "string") {
    return { error: "A valid email is required." };
  }

  const email = body.email.trim().toLowerCase();
  if (!emailPattern.test(email)) {
    return { error: "A valid email is required." };
  }

  const user: CreatedUser = {
    id: randomUUID(),
    email
  };

  for (const field of nameFields) {
    const rawValue = body[field];
    if (rawValue === undefined) {
      continue;
    }

    if (typeof rawValue !== "string") {
      return { error: `${field} must be a string when provided.` };
    }

    const normalized = normalizeName(rawValue);
    if (normalized) {
      user[field] = normalized;
    }
  }

  return { user };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = normalizeUserCreationPayload(req.body);

  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(201).json({
    data: result.user,
    message: "User creation is not implemented yet."
  });
});

export default router;
