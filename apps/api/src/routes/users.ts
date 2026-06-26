import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body as { name?: unknown; email?: unknown };

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name is required and must be a non-empty string" });
  }
  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: "email is required and must be a non-empty string" });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim().toLowerCase()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
