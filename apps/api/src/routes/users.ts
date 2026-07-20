import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body ?? {};

  const errors: string[] = [];

  if (typeof name !== "string" || name.trim().length === 0) {
    errors.push("name is required and must be a non-empty string.");
  }

  if (typeof email !== "string" || !email.includes("@")) {
    errors.push("email is required and must be a valid email address.");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim(),
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
