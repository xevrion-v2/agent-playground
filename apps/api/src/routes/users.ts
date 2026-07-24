import { Router, Request, Response } from "express";

const router = Router();

// Validation helpers
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const normalizeEmail = (email: string): string =>
  email.trim().toLowerCase();

const normalizeName = (name: string): string =>
  name.trim().replace(/\s+/g, " ");

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const body = req.body;

  // Reject non-object JSON bodies
  if (!isObject(body)) {
    return res.status(400).json({
      error: "Invalid request body. Must be a JSON object.",
    });
  }

  // Extract only allowed fields (name, email) and ignore everything else
  const { name, email } = body as { name?: unknown; email?: unknown };

  // Validate required fields
  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      error: "Name is required and must be a non-empty string.",
    });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      error: "A valid email is required.",
    });
  }

  // Normalize values
  const normalizedName = normalizeName(name);
  const normalizedEmail = normalizeEmail(email);

  // Create user (stub implementation – replace with actual DB logic)
  const newUser = {
    id: "stub-user-id", // placeholder – actual ID generation here
    name: normalizedName,
    email: normalizedEmail,
  };

  res.status(201).json({
    data: newUser,
    message: "User created successfully.",
  });
});

export default router;
