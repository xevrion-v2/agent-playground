import { Router } from "express";

const router = Router();

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input
 */
function sanitize(input: string): string {
  return input.trim().replace(/[<>"'&]/g, '');
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Reject non-object JSON bodies
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "Invalid request body. Expected a JSON object."
    });
  }

  // Require a valid email
  const { email, name } = req.body;
  
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      error: "Valid email is required."
    });
  }

  // Generate server-side ID (simple UUID-like)
  const id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Normalize email (lowercase)
  const normalizedEmail = email.toLowerCase().trim();

  // Normalize optional name
  const normalizedName = name 
    ? sanitize(typeof name === "string" ? name : String(name))
    : null;

  // Ignore client-controlled id and unrelated fields
  // Only return whitelisted fields
  const userData = {
    id,
    email: normalizedEmail,
    name: normalizedName,
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    data: userData,
    message: "User created successfully."
  });
});

export default router;
