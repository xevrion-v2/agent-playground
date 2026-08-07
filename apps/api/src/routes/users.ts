import { Router } from "express";

const router = Router();

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && emailRegex.test(email);
}

// Normalize email: trim and lowercase
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Normalize name: trim and remove extra whitespace
function normalizeName(name: string): string {
  if (typeof name !== "string") return "";
  return name.trim().replace(/\s+/g, " ");
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Criterion 1: Reject non-object JSON bodies
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "Request body must be a valid JSON object"
    });
  }

  const { email, name } = req.body;

  // Criterion 2: Require a valid email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      error: "A valid email is required"
    });
  }

  // Criterion 3: Normalize email and name values
  const normalizedEmail = normalizeEmail(email);
  const normalizedName = name ? normalizeName(name) : "";

  // Criterion 4: Ignore client-controlled id and unrelated fields
  // Only use email and name; discard everything else from request
  const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const user = {
    id: userId,
    email: normalizedEmail,
    ...(normalizedName && { name: normalizedName })
  };

  res.status(201).json({
    data: user,
    message: "User created successfully"
  });
});

export default router;
