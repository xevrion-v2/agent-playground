import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body || {};

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      error: "Invalid request",
      message: "email is required and must be a string"
    });
  }

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({
      error: "Invalid request",
      message: "name must be a string if provided"
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...(email && { email }),
      ...(name && { name })
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
