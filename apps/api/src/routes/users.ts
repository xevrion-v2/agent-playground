import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body || {};
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Validation Error", message: "Name is required." });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Validation Error", message: "Valid email is required." });
  }
  res.status(201).json({
    data: { id: "stub-user-id", name: name.trim(), email: email.trim() },
    message: "User created successfully."
  });
});

export default router;
