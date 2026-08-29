import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = (req.body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "name is required and must be a non-empty string"
    });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      error: "email is required and must be a valid email address"
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
