import { Router } from "express";

const router = Router();

// Simple email validation — accepts standard email formats
function isValidEmail(email: unknown): email is string {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  // Reject non-object payloads (arrays, primitives, null)
  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({
      error: "Invalid request body: expected a JSON object.",
    });
    return;
  }

  // Normalize email — trim before validation
  const rawEmail = typeof body.email === "string" ? body.email.trim() : body.email;

  // Validate required email field
  if (!rawEmail || !isValidEmail(rawEmail)) {
    res.status(400).json({
      error: "A valid 'email' field is required.",
    });
    return;
  }

  // Normalize fields
  const email = rawEmail.toLowerCase();
  const name = typeof body.name === "string" ? body.name.trim() : "";

  // Explicitly construct the user — ignore client-controlled `id` and any extra fields
  const user = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email,
    name,
  };

  res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

export default router;
