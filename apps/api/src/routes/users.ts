import { Router } from "express";

const router = Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body ?? {};

  if (!isNonEmptyString(name)) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
      email: email.trim(),
      name: name.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
