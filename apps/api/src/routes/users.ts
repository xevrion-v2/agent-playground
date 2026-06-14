import { Router, Request, Response, NextFunction } from "express";

interface CreateUserBody {
  name?: string;
  email?: string;
}

const ALLOWED_FIELDS: (keyof CreateUserBody)[] = ["name", "email"];

function validateCreateUser(req: Request, res: Response, next: NextFunction): void {
  const body = req.body as Record<string, unknown>;

  // Only allow whitelisted fields
  const sanitized: CreateUserBody = {};
  for (const key of ALLOWED_FIELDS) {
    if (body[key] !== undefined) {
      sanitized[key] = String(body[key]).slice(0, 255); // Limit length
    }
  }

  // Validate email format if provided
  if (sanitized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized.email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  // Validate name length if provided
  if (sanitized.name && sanitized.name.length === 0) {
    res.status(400).json({ error: "Name cannot be empty" });
    return;
  }

  req.body = sanitized;
  next();
}

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validateCreateUser, (req, res) => {
  const { name, email } = req.body as CreateUserBody;
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...(name && { name }),
      ...(email && { email })
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
