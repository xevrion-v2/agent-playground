import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ data: [], message: "User listing is not implemented yet." });
});

router.post("/", (req, res) => {
  // Allowlist only safe fields to prevent mass assignment.
  const { name, email } = req.body as { name?: unknown; email?: unknown };

  if (typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "name is required" } });
    return;
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "valid email required" } });
    return;
  }

  res.status(201).json({
    data: { id: "stub-user-id", name: name.trim(), email: email.toLowerCase() },
    message: "User creation is not implemented yet.",
  });
});

export default router;
