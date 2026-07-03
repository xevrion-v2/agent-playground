import { randomUUID } from "node:crypto";
import { Router } from "express";

const router = Router();

const ALLOWED_USER_FIELDS = ["username", "email", "name"] as const;

/**
 * Pick only known fields from the request body, strip everything else.
 */
function sanitizeUserBody(body: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const field of ALLOWED_USER_FIELDS) {
    if (body[field] !== undefined) {
      sanitized[field] = body[field];
    }
  }
  return sanitized;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const sanitizedBody = sanitizeUserBody(req.body);

  const user = {
    id: randomUUID(),
    ...sanitizedBody
  };

  res.status(201).json({
    data: user,
    message: "User created successfully."
  });
});

export default router;
