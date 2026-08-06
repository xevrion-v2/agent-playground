import { Router } from "express";
import crypto from "node:crypto";

const router = Router();

// Simple email validation regex matching standard formats
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  // 1. Reject non-object JSON bodies or arrays
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    res.status(400).json({
      error: "Bad Request",
      message: "Request body must be a valid JSON object."
    });
    return;
  }

  const { email, name } = body;

  // 2. Require email and check if it is a string
  if (typeof email !== "string") {
    res.status(400).json({
      error: "Bad Request",
      message: "Email is required and must be a string."
    });
    return;
  }

  // 3. Normalize email value (trim and lowercase)
  const normalizedEmail = email.trim().toLowerCase();

  // 4. Validate normalized email format
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    res.status(400).json({
      error: "Bad Request",
      message: "Email must be a valid email address."
    });
    return;
  }

  // 5. Normalize optional name value (trim if string, ignore if other type or undefined)
  let normalizedName: string | undefined;
  if (typeof name === "string") {
    normalizedName = name.trim();
  }

  // 6. Generate server-side UUID and ignore client-controlled id or extra fields
  const userId = crypto.randomUUID();

  const responseData: Record<string, any> = {
    id: userId,
    email: normalizedEmail
  };

  if (normalizedName !== undefined) {
    responseData.name = normalizedName;
  }

  res.status(201).json({
    data: responseData,
    message: "User creation is not implemented yet."
  });
});

export default router;
