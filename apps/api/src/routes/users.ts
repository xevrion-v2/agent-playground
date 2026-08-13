import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing 'name'" });
  }

  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing 'email'" });
  }

  // Simple conservative email validation pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
