import { Router } from "express";
import { apiError } from "../utils/errors";

const ALLOWED_FIELDS = ["email", "name"] as const;
type AllowedField = typeof ALLOWED_FIELDS[number];

function sanitizeUserPayload(body: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const key of ALLOWED_FIELDS) {
    if (body[key] !== undefined) {
      const val = body[key];
      if (key === "email" && typeof val === "string") {
        cleaned[key] = val.trim().toLowerCase();
      } else {
        cleaned[key] = val;
      }
    }
  }
  return cleaned;
}

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return apiError(res, 400, "Request body must be a JSON object");
  }
  if (!req.body.email || typeof req.body.email !== "string") {
    return apiError(res, 400, "email is required and must be a string");
  }
  const email = req.body.email.trim().toLowerCase();
  if (!email.includes("@")) {
    return apiError(res, 400, "email must contain @");
  }
  const sanitized = sanitizeUserPayload(req.body);
  res.status(201).json({
    data: {
      id: `usr_${Date.now()}`,
      ...sanitized
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
