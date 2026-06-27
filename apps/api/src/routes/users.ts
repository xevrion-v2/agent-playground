import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  // 1. Reject non-object JSON bodies
  if (!isPlainObject(req.body)) {
    return res.status(400).json({
      error: "Request body must be a JSON object.",
      message: "Request body must be a JSON object.",
    });
  }

  // 2. Validate email presence and type
  const emailRaw = req.body.email;
  if (typeof emailRaw !== "string") {
    return res.status(400).json({
      error: "A valid email is required.",
      message: "A valid email is required.",
      errors: [{ field: "email", message: "A valid email is required." }]
    });
  }

  // 3. Normalize and validate email format
  const email = emailRaw.trim().toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({
      error: "A valid email is required.",
      message: "A valid email is required.",
      errors: [{ field: "email", message: "A valid email is required." }]
    });
  }

  // 4. Validate and normalize optional name
  let name: string | undefined;
  if (req.body.name !== undefined && req.body.name !== null) {
    if (typeof req.body.name !== "string") {
      return res.status(400).json({
        error: "Name must be a string when provided.",
        message: "Name must be a string when provided.",
        errors: [{ field: "name", message: "Name must be a string when provided." }]
      });
    }
    const trimmed = req.body.name.trim().replace(/\s+/g, " ");
    if (trimmed.length > 0) {
      name = trimmed;
    }
  }

  // 5. Generate server-side ID and ignore client-controlled fields
  const user = {
    id: randomUUID(),
    email,
    ...(name ? { name } : {}),
  };

  return res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

export default router;
