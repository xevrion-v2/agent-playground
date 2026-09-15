import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

const EMAIL_PATTERN = /^[^s@]+@[^s@]+.[^s@]+$/;

type UserCreationBody = {
  email?: unknown;
  name?: unknown;
};

function isPlainObject(value: unknown): value is UserCreationBody {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeOptionalName(value: unknown) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().replace(/s+/g, " ");
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  return EMAIL_PATTERN.test(normalized) ? normalized : undefined;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isPlainObject(req.body)) {
    return res.status(400).json({
      error: "Request body must be a JSON object."
    });
  }

  const email = normalizeEmail(req.body.email);
  if (!email) {
    return res.status(400).json({
      error: "A valid email is required."
    });
  }

  const name = normalizeOptionalName(req.body.name);
  const user = {
    id: randomUUID(),
    email,
    ...(name ? { name } : {})
  };

  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

export default router;
