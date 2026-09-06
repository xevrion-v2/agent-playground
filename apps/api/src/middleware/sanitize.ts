import { Request, Response, NextFunction } from "express";

/**
 * Recursively trim string values and strip basic HTML/script tags
 * from request body, query, and params.
 */
function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    // Trim whitespace
    let clean = value.trim();
    // Strip HTML tags
    clean = clean.replace(/<[^>]*>/g, "");
    // Remove null bytes
    clean = clean.replace(/\0/g, "");
    return clean;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value !== null && typeof value === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      sanitized[key] = sanitizeValue(val);
    }
    return sanitized;
  }

  return value;
}

/**
 * Express middleware that sanitizes user-supplied input on
 * req.body, req.query, and req.params to prevent XSS and
 * injection attacks.
 */
export function inputSanitization(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }

  if (req.query && typeof req.query === "object") {
    req.query = sanitizeValue(req.query) as typeof req.query;
  }

  if (req.params && typeof req.params === "object") {
    req.params = sanitizeValue(req.params) as typeof req.params;
  }

  next();
}

export default inputSanitization;
