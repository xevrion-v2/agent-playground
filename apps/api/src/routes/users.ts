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
  
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email is required" });
  }
  
  if (name && typeof name !== "string") {
    return res.status(400).json({ error: "Name must be a string" });
  }

  // Prevent mass assignment by explicitly defining the payload
  const safePayload = {
    id: "stub-user-id",
    email,
    name: name || null
  };

  res.status(201).json({
    data: safePayload,
    message: "User creation is not implemented yet."
  });
});

export default router;
