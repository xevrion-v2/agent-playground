import { Router } from "express";
import { randomUUID } from "crypto";

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  // Reject non-object JSON bodies
  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({ error: "Request body must be a JSON object." });
    return;
  }

  // Require valid email
  const rawEmail = body.email;
  if (typeof rawEmail !== "string" || !EMAIL_REGEX.test(rawEmail)) {
    res.status(400).json({ error: "A valid email is required." });
    return;
  }

  // Normalize email and name
  const email = rawEmail.trim().toLowerCase();
  const name = typeof body.name === "string" ? body.name.trim() : undefined;

  // Generate server-side id, only keep email and name
  const id = randomUUID();

  const createdUser: Record<string, unknown> = { id, email };
  if (name !== undefined && name !== "") {
    createdUser.name = name;
  }

  res.status(201).json({ data: createdUser, message: "User created successfully." });
});

export default router;
