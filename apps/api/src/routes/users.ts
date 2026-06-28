import { randomUUID } from "node:crypto";
import { Router } from "express";

type CreateUserPayload = {
  email?: string;
  name?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (value: string): string => value.trim().toLowerCase();
const normalizeName = (value: string): string => value.trim().replace(/\s+/g, " ");

export const createUser = (payload: unknown) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Request body must be a JSON object");
  }

  const { email: emailValue, name: nameValue } = payload as CreateUserPayload;

  if (nameValue !== undefined && typeof nameValue !== "string") {
    throw new Error("name must be a string if provided");
  }

  if (typeof emailValue !== "string") {
    throw new Error("email is required and must be a valid email address");
  }

  const email = normalizeEmail(emailValue);
  if (!EMAIL_REGEX.test(email)) {
    throw new Error("email is required and must be a valid email address");
  }

  const response = {
    id: randomUUID(),
    email,
    ...(typeof nameValue === "string" ? { name: normalizeName(nameValue) } : {})
  };

  return response;
};

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  try {
    const data = createUser(req.body);

    res.status(201).json({
      data,
      message: "User created."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid payload";
    res.status(400).json({
      error: message,
      message: "Failed to create user"
    });
  }
});

export default router;
