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

  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
      error: "Validation failed",
      message: "email is required and must be a non-empty string."
    });
  }

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Validation failed",
      message: "name is required and must be a non-empty string."
    });
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
