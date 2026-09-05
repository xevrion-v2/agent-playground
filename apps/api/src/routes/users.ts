import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UserCreatePayload = {
  email?: unknown;
  name?: unknown;
  firstName?: unknown;
  lastName?: unknown;
};

type NormalizedUserInput = {
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeText(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeUserPayload(body: unknown): { data?: NormalizedUserInput; error?: string } {
  if (!isRecord(body)) {
    return { error: "Request body must be a JSON object." };
  }

  const payload = body as UserCreatePayload;
  const email = normalizeText(payload.email)?.toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { error: "A valid email is required." };
  }

  const normalizedNames = {
    name: normalizeText(payload.name),
    firstName: normalizeText(payload.firstName),
    lastName: normalizeText(payload.lastName)
  };

  for (const key of Object.keys(normalizedNames) as Array<keyof typeof normalizedNames>) {
    if (payload[key] !== undefined && payload[key] !== null && typeof payload[key] !== "string") {
      return { error: `${key} must be a string when provided.` };
    }
  }

  return {
    data: {
      email,
      ...Object.fromEntries(Object.entries(normalizedNames).filter(([, value]) => value))
    }
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = normalizeUserPayload(req.body);

  if (!result.data) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...result.data
    },
    message: "User created."
  });
});

export default router;
