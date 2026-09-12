import { Router } from "express";

const router = Router();

/**
 * Lightweight email format check.
 * Does not perform full RFC 5322 validation; sufficient for route stub input guarding.
 */
function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body ?? {};

  if (!email) {
    return res.status(400).json({
      status: "error",
      error: {
        code: "VALIDATION_ERROR",
        message: "email is required."
      }
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: "error",
      error: {
        code: "VALIDATION_ERROR",
        message: "email must be a valid email address."
      }
    });
  }

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({
      status: "error",
      error: {
        code: "VALIDATION_ERROR",
        message: "name must be a string when provided."
      }
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      ...(name !== undefined && { name })
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
