import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  const emailRaw = req.body.email;
  if (typeof emailRaw !== "string" || !EMAIL_PATTERN.test(emailRaw.trim())) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  const nameRaw = req.body.name;
  const name =
    typeof nameRaw === "string" && nameRaw.trim().length > 0
      ? nameRaw.trim()
      : undefined;

  res.status(201).json({
    data: {
      id: randomUUID(),
      email: emailRaw.trim().toLowerCase(),
      ...(name ? { name } : {}),
    },
    message: "User created.",
  });
});

export default router;
