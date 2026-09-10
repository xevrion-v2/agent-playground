import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper: validate email format
function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  return EMAIL_REGEX.test(email.trim());
}

// Helper: normalize email (trim, lowercase)
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Helper: normalize name (trim, collapse whitespace)
function normalizeName(name: string): string {
  if (typeof name !== "string") return "";
  return name.trim().replace(/\s+/g, " ");
}

// Validation middleware for user creation
function validateUserCreation(req: Request, res: Response, next: Function) {
  // Reject non-object JSON bodies
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "Invalid request body. Expected a JSON object."
    });
  }

  // Extract and validate email (required)
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required."
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Invalid email format."
    });
  }

  // Attach normalized data to request for handler
  (req as any).validatedUser = {
    email: normalizeEmail(email),
    name: name ? normalizeName(name) : ""
  };

  next();
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validateUserCreation, (req, res) => {
  const validatedUser = (req as any).validatedUser;

  // Generate server-side ID
  const userId = uuidv4();

  res.status(201).json({
    data: {
      id: userId,
      email: validatedUser.email,
      name: validatedUser.name || undefined,
      createdAt: new Date().toISOString()
    },
    message: "User created successfully."
  });
});

export default router;
