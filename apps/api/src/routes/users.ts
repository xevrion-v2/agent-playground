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

  if (!email) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Email is required"
    });
  }

  if (typeof email !== "string" || !/.+@.+\..+/.test(email)) {
    return res.status(400).json({
      error: "Validation failed",
      message: "A valid email address is required"
    });
  }

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({
      error: "Validation failed",
      message: "Name must be a string"
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name
    },
    message: "User creation is not implemented yet."
  });
});

export default router;

