import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      error: "Invalid payload: request body must be a JSON object"
    });
  }

  const { email, name } = body;

  if (typeof email !== "string" || !email.trim() || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({
      error: "Valid email is required"
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : undefined;

  const user: Record<string, any> = {
    id: randomUUID(),
    email: normalizedEmail,
  };

  if (normalizedName !== undefined) {
    user.name = normalizedName;
  }

  return res.status(201).json({
    data: user,
    message: "User created successfully."
  });
});

export default router;
