import { RequestHandler, Router } from "express";

/**
 * Returns 405 Method Not Allowed with an Allow header listing
 * the supported methods for a given route.
 *
 * Usage:
 *   router.all("/", methodNotAllowed(["GET", "POST"]));
 */
export function methodNotAllowed(allowed: string[]): RequestHandler {
  return (_req, res) => {
    res.setHeader("Allow", allowed.join(", "));
    res.status(405).json({
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: 
      }
    });
  };
}

export default methodNotAllowed;
