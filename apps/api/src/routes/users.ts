import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

type CreateUserPayload = {
  email: string;
  name?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function parseCreateUserPayload(body: unknown): CreateUserPayload | { error: string } {
  if (!isPlainObject(body)) {
    return { error: "Request body must be a JSON object." };
  }

  const rawEmail = body.email;
  if (typeof rawEmail !== "string") {
    return { error: "A valid email is required." };
  }

  const email = rawEmail.trim().toLowerCase();
  if (!emailPattern.test(email)) {
    return { error: "A valid email is required." };
  }

  const rawName = body.name;
  if (rawName !== undefined && typeof rawName !== "string") {
    return { error: "Name must be a string when provided." };
  }

  const name = rawName === undefined ? undefined : normalizeWhitespace(rawName);

  return name ? { email, name } : { email };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const parsed = parseCreateUserPayload(req.body);

  if ("error" in parsed) {
    res.status(400).json({
      error: parsed.error
    });
    return;
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...parsed
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
