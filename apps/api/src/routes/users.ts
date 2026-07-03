import { Router, Request, Response, NextFunction } from "express";
import { validationFailed } from "../lib/errors";

const router = Router();

// ── Validation helpers ──────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCreateUser(req: Request, res: Response, next: NextFunction): void {
  const { email, name } = req.body;
  const errors: string[] = [];

  if (!email || typeof email !== "string") {
    errors.push("email is required and must be a string.");
  } else if (!EMAIL_RE.test(email)) {
    errors.push("email must be a valid email address.");
  }

  if (name !== undefined && typeof name !== "string") {
    errors.push("name must be a string when provided.");
  }

  const allowedFields = ["email", "name"];
  const unknownFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );
  if (unknownFields.length > 0) {
    errors.push(`unknown field${unknownFields.length > 1 ? "s" : ""}: ${unknownFields.join(", ")}.`);
  }

  if (errors.length > 0) {
    validationFailed(res, errors);
    return;
  }

  next();
}

// ── Routes ──────────────────────────────────────────────────────

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validateCreateUser, (req, res) => {
  const { email, name } = req.body;

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
