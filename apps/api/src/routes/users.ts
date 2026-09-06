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
  const { name, email } = req.body ?? {};

  if (!isNonEmptyString(name)) {
    return res.status(400).json({
      error: "Name must be a non-empty string."
    });
  }

  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({
      error: "Email must be a valid non-empty email address."
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
