import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

type CreateUserInput = {
  email: string;
  name?: string;
};

type ValidationResult =
  | { ok: true; value: CreateUserInput }
  | { ok: false; errors: string[] };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeOptionalName(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > 0 ? normalized : undefined;
}

export function validateCreateUserPayload(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return { ok: false, errors: ["Request body must be a JSON object."] };
  }

  const errors: string[] = [];
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(email)) {
    errors.push("A valid email is required.");
  }

  if (body.name !== undefined && typeof body.name !== "string") {
    errors.push("Name must be a string when provided.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const name = normalizeOptionalName(body.name);

  return {
    ok: true,
    value: {
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
  const result = validateCreateUserPayload(req.body);

  if (!result.ok) {
    res.status(422).json({
      error: "Invalid user payload.",
      details: result.errors
    });
    return;
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...result.value
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
