import { Router, Request, Response, NextFunction } from "express";
import crypto from "crypto";

const router = Router();

// Validation helpers
function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

function isValidName(name: unknown): boolean {
  if (typeof name !== "string") return false;
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name.trim());
}

function normalizeString(value: string): string {
  return value.trim().toLowerCase();
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown> | undefined;

  // Validate body is a non-null object (not array, not primitive)
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      error: "Invalid request body. Expected a JSON object.",
    });
  }

  // Validate email (required)
  const email = body.email;
  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Validation failed",
      details: {
        email: "A valid email address is required.",
      },
    });
  }

  // Validate name (optional but must be valid if provided)
  const name = body.name;
  let normalizedName: string | null = null;
  if (name !== undefined && name !== null) {
    if (!isValidName(name)) {
      return res.status(400).json({
        error: "Validation failed",
        details: {
          name: "Name must contain only letters, spaces, hyphens, and apostrophes.",
        },
      });
    }
    normalizedName = normalizeString(name as string);
  }

  // Ignore client-controlled id and unrelated fields
  const allowedFields = new Set(["email", "name"]);
  const sanitizedData: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(body)) {
    if (allowedFields.has(key)) {
      sanitizedData[key] = value;
    }
    // Skip: id, _id, __proto__, constructor, and any other fields
  }

  // Generate server-side ID
  sanitizedData.id = crypto.randomUUID();

  // Normalize email
  sanitizedData.email = normalizeString(sanitizedData.email as string);

  // Set normalized name if provided
  if (normalizedName !== null) {
    sanitizedData.name = normalizedName;
  } else {
    sanitizedData.name = null;
  }

  res.status(201).json({
    data: sanitizedData,
    message: "User created successfully.",
  });
});

export default router;
