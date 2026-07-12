import { Router } from "express";

interface CreateUserBody {
  email?: string;
  name?: string;
}

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body = req.body as CreateUserBody;

  // Reject non-object
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    res.status(400).json({ error: "Request body must be a JSON object" });
    return;
  }

  // Require valid email
  if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) {
    res.status(400).json({ error: "A valid email is required" });
    return;
  }

  // Normalize email and name
  const email = body.email.trim().toLowerCase();
  const name = typeof body.name === "string" ? body.name.trim() : undefined;

  // Ignore client-controlled id and unrelated fields
  const safeData: Record<string, unknown> = { email, name };
  if (name) safeData.name = name;

  res.status(201).json({
    data: {
      id: ,
      ...safeData
    },
    message: "User created (mock)."
  });
});

export default router;
