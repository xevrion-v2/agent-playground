import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserResponse = {
  id: string;
  email: string;
  name: string | null;
};

type CreateUserResult =
  | {
      ok: true;
      user: CreateUserResponse;
    }
  | {
      ok: false;
      status: 400;
      error: string;
    };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const email = value.trim().toLowerCase();

  return EMAIL_PATTERN.test(email) ? email : null;
}

function normalizeName(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const name = value.trim();

  return name.length > 0 ? name : null;
}

export function createUserFromBody(body: unknown): CreateUserResult {
  if (!isPlainObject(body)) {
    return {
      ok: false,
      status: 400,
      error: "Request body must be a JSON object."
    };
  }

  const email = normalizeEmail(body.email);

  if (!email) {
    return {
      ok: false,
      status: 400,
      error: "A valid email address is required."
    };
  }

  return {
    ok: true,
    user: {
      id: `usr_${randomUUID()}`,
      email,
      name: normalizeName(body.name)
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
  const result = createUserFromBody(req.body);

  if (!result.ok) {
    res.status(result.status).json({
      error: result.error
    });
    return;
  }

  res.status(201).json({
    data: result.user,
    message: "User created successfully."
  });
});

export default router;
