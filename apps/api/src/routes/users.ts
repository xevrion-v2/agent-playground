import { Router, Request, Response, NextFunction } from "express";

const router = Router();

function validateCreateUser(req: Request, res: Response, next: NextFunction): void {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({ error: "Request body must be a JSON object." });
    return;
  }

  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    res.status(400).json({ error: "name is required and must be a non-empty string." });
    return;
  }

  if (typeof body.email !== "string" || body.email.trim().length === 0) {
    res.status(400).json({ error: "email is required and must be a non-empty string." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email.trim())) {
    res.status(400).json({ error: "email must be a valid email address." });
    return;
  }

  next();
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validateCreateUser, (req, res) => {
  const { name, email } = req.body;
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
