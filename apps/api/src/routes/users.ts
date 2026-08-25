import { Router, Request, Response } from "express";

const router = Router();

// [FIX #3] Input validation: whitelist allowed fields and validate types
interface CreateUserBody {
  name?: string;
  email?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  // [FIX #1] Whitelist specific fields instead of spreading req.body
  const { name, email }: CreateUserBody = req.body;

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Field 'name' is required and must be a non-empty string." });
    return;
  }

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    res.status(400).json({ error: "Field 'email' is required and must be a valid email address." });
    return;
  }

  // Sanitize: trim whitespace and limit length
  const sanitizedName = name.trim().slice(0, 100);
  const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: sanitizedName,
      email: sanitizedEmail,
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
