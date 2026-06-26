import type { ErrorRequestHandler } from "express";

/**
 * Express error-handling middleware that catches JSON body-parser syntax errors
 * (err.type === "entity.parse.failed") and returns a JSON 400 response instead
 * of the default HTML error page.
 *
 * Must be registered AFTER app.use(express.json()) to catch its errors.
 */
export const jsonErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (
    err instanceof SyntaxError &&
    "body" in err &&
    (err as Record<string, unknown>).type === "entity.parse.failed"
  ) {
    res.status(400).json({ error: "Invalid JSON request body" });
    return;
  }

  // Pass non-JSON-parser errors to the default Express error handler.
  // We re-throw via _next(err) so Express's built-in handler takes over
  // for non-JSON errors, but we intercept the JSON-parse case above.
  _next(err);
};
