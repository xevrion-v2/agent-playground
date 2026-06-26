import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserPayload = {
  email: string;
  name?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function invalidPayload(message: string) {
  return {
    error: {
      code: "invalid_user_payload",
      message
    }
  };
}

function normalizeCreateUserPayload(body: unknown): CreateUserPayload {
  if (!isRecord(body)) {
    throw new Error("Request body must be a JSON object.");
  }

  if (typeof body.email !== "string") {
    throw new Error("A valid email is required.");
  }

  const email = body.email.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    throw new Error("A valid email is required.");
  }

  const payload: CreateUserPayload = { email };
  if (body.name !== undefined) {
    if (typeof body.name !== "string") {
      throw new Error("Name must be a string when provided.");
    }

    const name = body.name.trim();
    if (name) {
      payload.name = name;
    }
  }

  return payload;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  let payload: CreateUserPayload;
  try {
    payload = normalizeCreateUserPayload(req.body);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid user payload.";
    res.status(400).json(invalidPayload(message));
    return;
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...payload
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
