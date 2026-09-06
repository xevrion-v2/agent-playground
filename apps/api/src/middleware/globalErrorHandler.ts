import { ErrorRequestHandler } from "express";

/**
 * Global error handler — mount LAST in the middleware chain.
 *
 * Catches all errors passed via next(err):
 * - SyntaxError from body-parser → 400 JSON
 * - Everything else → 500 JSON (root cause logged, not returned)
 */
export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Malformed JSON body
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: { code: "INVALID_JSON", message: "Request body contains invalid JSON" } });
    return;
  }

  // Log full error server-side without leaking details
  console.error("[unhandled error]", err);

  res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "An internal error occurred" } });
};

export default globalErrorHandler;
