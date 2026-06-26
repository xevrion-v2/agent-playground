import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

type UserCreateResult =
  | {
      ok: true;
      user: {
        id: string;
        email: string;
        name?: string;
      };
    }
  | {
      ok: false;
      message: string;
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function createUserId() {
  return `user_${randomUUID()}`;
}

export function buildUserFromPayload(body: unknown): UserCreateResult {
  if (!isPlainObject(body)) {
    return {
      ok: false,
      message: "User payload must be a JSON object."
    };
  }

  if (typeof body.email !== "string") {
    return {
      ok: false,
      message: "A valid email is required."
    };
  }

  const email = body.email.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      message: "A valid email is required."
    };
  }

  const user: Extract<UserCreateResult, { ok: true }>["user"] = {
    id: createUserId(),
    email
  };

  if ("name" in body) {
    if (typeof body.name !== "string") {
      return {
        ok: false,
        message: "Name must be a string when provided."
      };
    }

    const name = body.name.trim();
    if (name) {
      user.name = name;
    }
  }

  return {
    ok: true,
    user
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = buildUserFromPayload(req.body);

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
