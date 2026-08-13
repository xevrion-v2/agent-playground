import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

interface CreateUserPayload {
  email?: string;
  name?: string;
  displayName?: string;
  [key: string]: unknown;
}

interface User {
  id: string;
  email: string;
  name: string;
  displayName: string;
  createdAt: string;
}

function generateId(): string {
  return crypto.randomUUID();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function validateCreateUser(body: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
  sanitized?: CreateUserPayload;
} {
  const errors: string[] = [];

  // Reject if body is not a plain object or is null/array
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { valid: false, errors: ["Request body must be a JSON object"] };
  }

  // Email is required
  if (!body.email || typeof body.email !== "string") {
    errors.push("email is required and must be a string");
  } else if (!isValidEmail(body.email)) {
    errors.push("email must be a valid email address");
  }

  // Strip unknown/custom fields — only allow email, name, displayName
  const allowedKeys = new Set(["email", "name", "displayName"]);
  const extraKeys = Object.keys(body).filter((k) => !allowedKeys.has(k));
  if (extraKeys.length > 0) {
    errors.push(`Unexpected fields: ${extraKeys.join(", ")}`);
  }

  // Client must not send 'id'
  if ("id" in body) {
    errors.push("id is generated server-side and must not be provided");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  const sanitized: CreateUserPayload = {};

  // Email is mandatory
  sanitized.email = (body.email as string).toLowerCase().trim();

  // Name is optional — normalize if provided
  if (body.name && typeof body.name === "string") {
    sanitized.name = normalizeName(body.name);
  }

  // displayName is optional — normalize if provided
  if (body.displayName && typeof body.displayName === "string") {
    sanitized.displayName = body.displayName.trim();
  }

  return { valid: true, errors: [], sanitized };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const validation = validateCreateUser(req.body);

  if (!validation.valid) {
    res.status(400).json({
      error: "Validation failed",
      details: validation.errors,
    });
    return;
  }

  const user: User = {
    id: generateId(),
    email: validation.sanitized!.email!,
    name: validation.sanitized!.name ?? validation.sanitized!.email!.split("@")[0],
    displayName: validation.sanitized!.displayName ?? validation.sanitized!.name ?? validation.sanitized!.email!.split("@")[0],
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

export default router;
