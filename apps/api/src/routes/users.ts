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
  if (!isPlainObject(req.body)) {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  const emailRaw = req.body.email;
  if (typeof emailRaw !== "string") {
    return res.status(400).json({ error: "A valid email is required." });
  }

  const email = emailRaw.trim().toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  let name: string | undefined;
  if (req.body.name !== undefined && req.body.name !== null) {
    if (typeof req.body.name !== "string") {
      return res.status(400).json({ error: "Name must be a string when provided." });
    }
    const trimmed = req.body.name.trim().replace(/\s+/g, " ");
    if (trimmed.length > 0) {
      name = trimmed;
    }
  }

  const user = {
    id: randomUUID(),
    email,
    ...(name ? { name } : {}),
  };

  return res.status(201).json({
    data: user,
    message: "User created.",
  });
});

export default router;
