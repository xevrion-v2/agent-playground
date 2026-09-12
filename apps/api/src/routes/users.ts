import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    res.status(400).json({ error: "Request body must be a JSON object." });
    return;
  }

  const record = body as Record<string, unknown>;
  const email = record.email;
  const name = record.name;

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    res.status(400).json({ error: "A valid email is required." });
    return;
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      email: email.trim().toLowerCase(),
      name: typeof name === "string" && name.trim().length > 0 ? name.trim() : null
    },
    message: "User created."
  });
});

export default router;
