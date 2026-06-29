import { Router } from "express";

const router = Router();

type UserCreatePayload = {
  email: string;
  name?: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeUserCreatePayload(value: unknown): UserCreatePayload | null {
  if (!isPlainObject(value)) {
    return null;
  }

  if (typeof value.email !== "string") {
    return null;
  }

  const email = value.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  const payload: UserCreatePayload = { email };

  if (value.name !== undefined) {
    if (typeof value.name !== "string") {
      return null;
    }

    const name = value.name.trim().replace(/\s+/g, " ");
    if (name.length > 0) {
      payload.name = name;
    }
  }

  return payload;
}

function createServerGeneratedUserId(): string {
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const payload = normalizeUserCreatePayload(req.body);

  if (!payload) {
    return res.status(400).json({
      error: "Invalid user creation payload."
    });
  }

  res.status(201).json({
    data: {
      id: createServerGeneratedUserId(),
      ...payload
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
