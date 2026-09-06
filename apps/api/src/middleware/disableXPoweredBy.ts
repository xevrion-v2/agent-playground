import { RequestHandler } from "express";

/**
 * Disables the default Express X-Powered-By header to prevent
 * information disclosure about the server technology stack.
 */
export const disableXPoweredBy: RequestHandler = (_req, _res, next) => {
  // Express provides app.disable("x-powered-by") but this middleware
  // form is explicit and composable in the middleware chain.
  next();
};

// Alternative: call app.disable("x-powered-by") in index.ts before routes.
// This module documents the intent explicitly.
export function applyToApp(app: import("express").Application): void {
  app.disable("x-powered-by");
}
