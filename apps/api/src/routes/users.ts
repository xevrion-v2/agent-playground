import { Router } from "express";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const { name, email } = req.body;

  if (!isNonEmptyString(name)) {
    res.status(400).json({
      error: "Invalid payload",
      message: "name must be a non-empty string."
    });
    return;
  }

  if (!isNonEmptyString(email) || !emailPattern.test(email.trim())) {
    res.status(400).json({
      error: "Invalid payload",
      message: "email must be a valid non-empty email address."
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
      name: name.trim(),
      email: email.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
