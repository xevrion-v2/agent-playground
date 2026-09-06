import { Router } from "express";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && EMAIL_REGEX.test(email.trim());
}

function isValidName(name: unknown): name is string {
  return typeof name === "string" && name.trim().length > 0;
}

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body as { name?: unknown; email?: unknown };

  if (!isValidName(name)) {
    res.status(400).json({
      error: "Invalid payload: 'name' must be a non-empty string."
    });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({
      error: "Invalid payload: 'email' must be a valid non-empty email string."
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
