import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

type CreateUserPayload = {
  email: string;
  name?: string;
};

const allowedCreateUserFields = new Set(["email", "name"]);

export function validateCreateUserPayload(body: unknown):
  | { ok: true; value: CreateUserPayload }
  | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      ok: false,
      errors: ["Request body must be a JSON object."]
    };
  }

  const payload = body as Record<string, unknown>;
  const extraFields = Object.keys(payload).filter((key) => !allowedCreateUserFields.has(key));

  if (extraFields.length > 0) {
    errors.push(`Unsupported field(s): ${extraFields.join(", ")}.`);
  }

  if (typeof payload.email !== "string" || payload.email.trim().length === 0) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.push("Email must be a valid email address.");
  }

  if (payload.name !== undefined && typeof payload.name !== "string") {
    errors.push("Name must be a string when provided.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : undefined;

  return {
    ok: true,
    value: {
      email: payload.email.trim().toLowerCase(),
      ...(name ? { name } : {})
    }
  };
}

export function buildCreatedUser(payload: CreateUserPayload) {
  return {
    id: randomUUID(),
    ...payload
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const validation = validateCreateUserPayload(req.body);

  if (!validation.ok) {
    res.status(400).json({
      errors: validation.errors,
      message: "Invalid user creation payload."
    });
    return;
  }

  res.status(201).json({
    data: buildCreatedUser(validation.value),
    message: "User creation is not implemented yet."
  });
});

export default router;
