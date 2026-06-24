import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/**
 * Email validation pattern — basic RFC 5322 simplified check.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GET /users — Stub user listing endpoint.
 * Returns empty data until full implementation.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users — Stub user creation endpoint.
 * Validates email format before accepting the request.
 */
router.post("/", (req: Request, res: Response) => {
  const { email } = req.body || {};

  // Reject invalid email values early
  if (email !== undefined && typeof email === "string" && !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      error: {
        message: "Invalid email format"
      }
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

/**
 * Fallback for unsupported HTTP methods on /users.
 * Returns 405 with Allow header listing supported methods.
 */
router.all("/", (_req: Request, res: Response) => {
  res.set("Allow", "GET, POST");
  res.status(405).json({
    error: {
      message: "Method Not Allowed"
    }
  });
});

export default router;
