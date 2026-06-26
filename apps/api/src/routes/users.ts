import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "email is required and must be a string" });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name: name || null
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
