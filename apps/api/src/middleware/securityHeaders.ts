import { RequestHandler } from "express";

/**
 * Adds baseline security response headers to every API response:
 * - X-Frame-Options: DENY (prevent clickjacking)
 * - X-Content-Type-Options: nosniff (prevent MIME sniffing)
 * - Referrer-Policy: strict-origin-when-cross-origin
 * - X-XSS-Protection: 0 (modern browsers use CSP; legacy header disabled)
 */
export const securityHeaders: RequestHandler = (_req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "0");
  next();
};

export default securityHeaders;
