import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});


router.post("/", (req, res) => {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid JSON body. Expected an object." });
  }

  if (typeof body.email !== "string") {
    return res.status(400).json({ error: "Valid email is required." });
  }

  const normalizedEmail = body.email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return res.status(400).json({ error: "Valid email is required." });
  }

  let normalizedName: string | undefined = undefined;
  if (body.name !== undefined) {
    if (typeof body.name !== "string") {
      return res.status(400).json({ error: "Name must be a string if provided." });
    }
    normalizedName = body.name.trim();
  }

  const user = {
    id: randomUUID(),
    email: normalizedEmail,
    ...(normalizedName !== undefined ? { name: normalizedName } : {})
  };

  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

export default router;
