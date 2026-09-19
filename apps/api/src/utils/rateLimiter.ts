@'
import { Request, Response, NextFunction } from "express";

const requestCounts = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 100;

function getRateLimitKey(req: Request): string {
  return req.ip || req.socket?.remoteAddress || "unknown";
}

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = getRateLimitKey(req);
  const now = Date.now();
  const record = requestCounts.get(key);

  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + WINDOW_MS });
    return next();
  }

  record.count += 1;

  if (record.count > MAX_REQUESTS) {
    res.status(429).json({
      error: "Too many requests",
      message: Rate limit exceeded. Maximum  requests per  seconds.,
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    });
    return;
  }

  res.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS));
  res.setHeader("X-RateLimit-Remaining", String(MAX_REQUESTS - record.count));
  res.setHeader("X-RateLimit-Reset", String(Math.ceil(record.resetTime / 1000)));
  next();
}

export { WINDOW_MS, MAX_REQUESTS };
'@