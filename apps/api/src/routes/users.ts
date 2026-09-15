import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

type CreatedUser = {
  id: string;
  email: string;
  name?: string;
};

type UserCreationResult =
  | { ok: true; user: CreatedUser }
  | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function createUserFromPayload(
  body: unknown,
  generateId: () => string = randomUUID
): UserCreationResult {
  if (!isPlainObject(body)) {
    return {
      ok: false,
      error: "Request body must be a JSON object."
    };
  }

  if (typeof body.email !== "string") {
    return {
      ok: false,
      error: "A valid email is required."
    };
  }

  const email = normalizeText(body.email).toLowerCase();
  if (!emailPattern.test(email)) {
    return {
      ok: false,
      error: "A valid email is required."
    };
  }

  const user: CreatedUser = {
    id: generateId(),
    email
  };

  if (body.name !== undefined) {
    if (typeof body.name !== "string") {
      return {
        ok: false,
        error: "Name must be a string when provided."
      };
    }

    const name = normalizeText(body.name);
    if (name.length > 0) {
      user.name = name;
    }
  }

  return { ok: true, user };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = createUserFromPayload(req.body);

  if (!result.ok) {
    return res.status(400).json({
      error: result.error
    });
  }

  res.status(201).json({
    data: result.user,
    message: "User creation is not implemented yet."
  });
});

export default router;
