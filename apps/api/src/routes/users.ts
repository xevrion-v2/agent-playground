import { Router } from "express";
import { randomUUID } from "crypto";

const router = Router();

// Validation helpers
function isObject(value: unknown): boolean {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;

  const trimmed = email.trim();
  if (trimmed !== email) return false;
  if (trimmed.length === 0) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeName(name: unknown): string | null {
  if (name === null || name === undefined) return null;
  if (typeof name !== "string") return null;

  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : null;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  try {
    // Reject non-object JSON bodies
    if (!isObject(req.body)) {
      return res.status(400).json({
        error: "Request body must be a JSON object"
      });
    }

    const body = req.body as Record<string, unknown>;

    // Require a valid email
    if (body.email === undefined) {
      return res.status(422).json({
        error: "Email is required"
      });
    }

    if (!isValidEmail(body.email)) {
      return res.status(422).json({
        error: "Email must be a valid email address"
      });
    }

    // Validate and normalize name if provided
    if (body.name !== undefined && body.name !== null && typeof body.name !== "string") {
      return res.status(422).json({
        error: "Name must be a string"
      });
    }

    // Normalize values
    const normalizedEmail = normalizeEmail(body.email as string);
    const normalizedName = normalizeName(body.name);

    // Generate server-side id, ignore client-controlled fields
    const id = randomUUID();

    // Return only validated/generated fields
    return res.status(201).json({
      data: {
        id,
        email: normalizedEmail,
        name: normalizedName
      },
      message: "User created successfully"
    });
  } catch (error) {
    console.error("Error in POST /users:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default router;
