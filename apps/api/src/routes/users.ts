import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// ponytail: server-generated IDs, validated email, stripped client fields
router.post("/", (req, res) => {
  // Reject non-object JSON bodies
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }

  // Require valid email
  const email = (req.body.email as string | undefined)?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  // Ignore client-controlled id and unrelated fields; generate server-side
  const { id: _, ...cleanBody } = req.body;
  const name = (cleanBody.name as string | undefined)?.trim() || "";

  res.status(201).json({
    data: {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      email,
      ...(name && { name }),
    },
    message: "User created successfully."
  });
});

export default router;
