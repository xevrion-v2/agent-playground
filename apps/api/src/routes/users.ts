import { randomUUID } from "node:crypto";

import { Router } from "express";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserPayload = {
  email: string;
  name?: string;
};

type PayloadResult =
  | { data: CreateUserPayload }
  | { error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeCreateUserPayload(value: unknown): PayloadResult {
  if (!isRecord(value)) {
    return { error: "Request body must be a JSON object." };
  }

  if (typeof value.email !== "string") {
    return { error: "A valid email is required." };
  }

  const email = value.email.trim().toLowerCase();
  if (!emailPattern.test(email)) {
    return { error: "A valid email is required." };
  }

  if (value.name !== undefined && typeof value.name !== "string") {
    return { error: "Name must be a string when provided." };
  }

  const name = value.name?.trim();

  return {
    data: {
      email,
      ...(name ? { name } : {})
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
  const payload = normalizeCreateUserPayload(req.body);
  if ("error" in payload) {
    res.status(400).json({
      error: {
        message: payload.error
      }
    });
    return;
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...payload.data
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
