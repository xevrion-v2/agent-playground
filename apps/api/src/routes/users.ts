import { Router } from "express";
import crypto from "crypto";

const router = Router();

// Simple regex for basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GET /users
 * Lists all users in the system.
 */
router.get("/", (_req, res) => {
  // TODO: Implement pagination using 'page' and 'limit' query parameters.
  // TODO: Fetch users from Prisma database.
  // TODO: Filter users by role or active status if requested.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user.
 */
router.post("/", (req, res) => {
  const body = req.body;

  // 1. Reject non-object JSON bodies (null, arrays, primitives)
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request payload. Expected a JSON object." });
  }

  // 2. Require email and validate it
  const { email, name } = body;
  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  // 3. Normalize email and name
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = typeof name === "string" ? name.trim() : null;

  // 4. Ignore client-controlled id and unrelated fields. Generate server-side id.
  const userId = crypto.randomUUID();

  res.status(201).json({
    data: {
      id: userId,
      email: normalizedEmail,
      ...(normalizedName !== null ? { name: normalizedName } : {})
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
