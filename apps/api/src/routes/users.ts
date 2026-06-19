import { Router } from "express";

const router = Router();

type CreateUserPayload = {
  name: string;
  email: string;
};

type ValidationResult =
  | { ok: true; value: CreateUserPayload }
  | { ok: false; errors: Array<{ field: string; message: string }> };

const allowedCreateUserFields = new Set(["name", "email"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateCreateUserPayload(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return {
      ok: false,
      errors: [{ field: "body", message: "Request body must be a JSON object." }]
    };
  }

  const errors: Array<{ field: string; message: string }> = [];

  for (const field of Object.keys(body)) {
    if (!allowedCreateUserFields.has(field)) {
      errors.push({ field, message: "Field is not allowed." });
    }
  }

  const rawName = body.name;
  const rawEmail = body.email;

  if (typeof rawName !== "string" || rawName.trim().length === 0) {
    errors.push({ field: "name", message: "Name is required." });
  } else if (rawName.trim().length > 120) {
    errors.push({ field: "name", message: "Name must be 120 characters or fewer." });
  }

  if (typeof rawEmail !== "string" || rawEmail.trim().length === 0) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!emailPattern.test(rawEmail.trim())) {
    errors.push({ field: "email", message: "Email must be valid." });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name: String(rawName).trim(),
      email: String(rawEmail).trim().toLowerCase()
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
    return res.status(400).json({
      error: {
        code: "INVALID_USER_PAYLOAD",
        message: "User payload failed validation.",
        details: result.errors
      }
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...result.value
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
