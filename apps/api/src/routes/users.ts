import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }

  const rawEmail = body.email;
  if (typeof rawEmail !== "string") {
    return res.status(400).json({ error: "Valid email is required" });
  }
  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  let name: string | undefined;
  if (body.name !== undefined && body.name !== null) {
    if (typeof body.name !== "string") {
      return res.status(400).json({ error: "Name must be a string" });
    }
    name = body.name.trim();
  }

  const data: { id: string; email: string; name?: string } = { id: randomUUID(), email };
  if (name) data.name = name;

  res.status(201).json({ data, message: "User created" });
});

export default router;
