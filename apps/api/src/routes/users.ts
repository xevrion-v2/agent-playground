import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeName(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > 0 ? normalized : undefined;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "User payload must be a JSON object."
    });
  }

  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      error: "A valid email is required."
    });
  }

  const name = normalizeName(req.body.name);

  res.status(201).json({
    data: {
      id: randomUUID(),
      email,
      ...(name ? { name } : {})
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
