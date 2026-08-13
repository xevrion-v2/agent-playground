import { Request, Response, NextFunction } from "express";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

/**
 * Simple in-memory rate limiter middleware.
 *
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @param maxRequests - Maximum requests per window (default: 100)
 */
export function rateLimiter(windowMs: number = 60_000, maxRequests: number = 100) {
  const clients = new Map<string, RateLimitEntry>();

  // Periodically clean up expired entries to prevent memory leaks
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of clients) {
      if (now > entry.resetTime) {
        clients.delete(key);
      }
    }
  }, windowMs);

  // Allow the cleanup timer to not keep the process alive
  cleanupInterval.unref();

  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    let entry = clients.get(clientIp);

    if (!entry || now > entry.resetTime) {
      entry = { count: 1, resetTime: now + windowMs };
      clients.set(clientIp, entry);
    } else {
      entry.count++;
    }

    // Set rate limit headers
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, maxRequests - entry.count));
    res.setHeader("X-RateLimit-Reset", Math.ceil(entry.resetTime / 1000));

    if (entry.count > maxRequests) {
      res.setHeader("Retry-After", Math.ceil((entry.resetTime - now) / 1000));
      return res.status(429).json({
        error: "Too many requests",
        message: `Rate limit exceeded. Try again in ${Math.ceil((entry.resetTime - now) / 1000)} seconds.`,
      });
    }

    next();
  };
}
