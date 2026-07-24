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
  const body = req.body && typeof req.body === "object" ? req.body : null;
  if (!body) {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  const name = typeof body.name === "string" ? body.name.trim() : undefined;

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      ...(name ? { name } : {}),
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
