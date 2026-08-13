import { ErrorRequestHandler } from "express";

/**
 * Catches SyntaxError thrown by express.json() when the request body
 * is malformed JSON.  Returns a consistent JSON error envelope instead
 * of the default HTML error page.
 */
export const jsonParseErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof SyntaxError && "body" in err && (err as any).type === "entity.parse.failed") {
    res.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "Request body contains invalid JSON",
      },
    });
    return;
  }
  next(err);
};

export default jsonParseErrorHandler;
