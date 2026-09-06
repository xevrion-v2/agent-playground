import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

interface ValidationError {
  path: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCreateUser(body: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  const { name, email } = body;

  if (!name || (typeof name === "string" && name.trim().length === 0)) {
    errors.push({ path: "name", message: "Name is required and must be a non-empty string." });
  }

  if (!email || (typeof email === "string" && email.trim().length === 0)) {
    errors.push({ path: "email", message: "Email is required and must be a non-empty string." });
  } else if (typeof email === "string" && !EMAIL_REGEX.test(email)) {
    errors.push({ path: "email", message: "Email must be a valid email address." });
  }

  return errors;
}

router.post("/", (req: Request, res: Response) => {
  const errors = validateCreateUser(req.body);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: req.body.name,
      email: req.body.email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
