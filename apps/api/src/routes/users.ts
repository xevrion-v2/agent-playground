import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body ?? {};

  // Validate required fields: email and name must be non-empty strings
  if (typeof email !== "string" || email.trim() === "" ||
      typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ error: "email and name are required" });
    return;
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
