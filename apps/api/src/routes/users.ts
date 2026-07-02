import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Reject non-object bodies
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    res.status(400).json({
      error: "Request body must be a JSON object."
    });
    return;
  }

  const { email: rawEmail, name: rawName } = req.body;

  // Require valid email
  if (typeof rawEmail !== "string" || rawEmail.trim().length === 0) {
    res.status(400).json({
      error: "A valid email is required."
    });
    return;
  }

  const email = rawEmail.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      error: "A valid email is required."
    });
    return;
  }

  // Normalize optional name
  const name = typeof rawName === "string" ? rawName.trim() : undefined;

  // Generate server-side id and return only validated fields
  const id = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  res.status(201).json({
    data: { id, email, name },
    message: "User created successfully."
  });
});

export default router;
