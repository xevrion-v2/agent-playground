import { Router } from "express";

const router = Router();

type CreateUserPayload = {
  email: string;
  name: string;
};

type ValidationResult =
  | { ok: true; data: CreateUserPayload }
  | { ok: false; details: string[] };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateCreateUserPayload(body: unknown): ValidationResult {
  if (!isPlainObject(body)) {
    return {
      ok: false,
      details: ["Request body must be a JSON object."]
    };
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const details: string[] = [];

  if (!name) {
    details.push("name must be a non-empty string.");
  }

  if (!email) {
    details.push("email must be a non-empty string.");
  }

  if (details.length > 0) {
    return { ok: false, details };
  }

  return {
    ok: true,
    data: { email, name }
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const validation = validateCreateUserPayload(req.body);

  if (!validation.ok) {
    return res.status(400).json({
      error: {
        code: "INVALID_USER_PAYLOAD",
        message: "User creation requires a valid request body.",
        details: validation.details
      }
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...validation.data
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
