import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "Invalid request body.",
      message: "Expected a JSON object for user creation."
    });
  }

  if (typeof req.body.email !== "string" || req.body.email.trim() === "") {
    return res.status(400).json({
      error: "Invalid email.",
      message: "A non-empty email is required to create a user."
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
