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
  const { email, name } = req.body ?? {};

  if (!isNonEmptyString(name)) {
    return res.status(400).json({
      error: "Invalid user payload",
      message: "name must be a non-empty string."
    });
  }

  if (!isNonEmptyString(email) || !emailPattern.test(email.trim())) {
    return res.status(400).json({
      error: "Invalid user payload",
      message: "email must be a valid non-empty email string."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email: email.trim(),
      name: name.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
