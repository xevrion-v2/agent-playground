import { Router, Request, Response } from "express";

const router = Router();

function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  // RFC 5322 simplified email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

function normalizeString(value: string | undefined | null): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function sanitizeUserPayload(body: unknown): { data: Record<string, unknown>; errors: string[] } {
  const errors: string[] = [];
  
  // Must be a non-null object
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    errors.push("Request body must be a JSON object");
    return { data: {}, errors };
  }
  
  const obj = body as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  
  // Generate server-side id (UUID-like)
  result["id"] = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Require valid email
  if (!obj["email"]) {
    errors.push("email is required");
  } else if (typeof obj["email"] !== "string" || !isValidEmail(obj["email"])) {
    errors.push("email must be a valid email address");
  } else {
    result["email"] = normalizeString(obj["email"]).toLowerCase();
  }
  
  // Normalize optional name
  if (obj["name"] !== undefined) {
    if (typeof obj["name"] !== "string") {
      errors.push("name must be a string");
    } else {
      result["name"] = normalizeString(obj["name"]);
    }
  }
  
  // Ignore client-controlled id and unrelated fields
  // Only allow: id (generated), email, name
  
  return { data: result, errors };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const { data, errors } = sanitizeUserPayload(req.body);
  
  if (errors.length > 0) {
    res.status(400).json({
      errors,
      message: "Validation failed"
    });
    return;
  }
  
  res.status(201).json({
    data,
    message: "User created successfully."
  });
});

export default router;
