import { Router } from "express";

const router = Router();

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
      error: "Invalid user payload",
      details: validation.details
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

type CreateUserPayload = {
  name: string;
  email: string;
};

type ValidationResult =
  | { ok: true; data: CreateUserPayload }
  | { ok: false; details: string[] };

function validateCreateUserPayload(payload: unknown): ValidationResult {
  const details: string[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      ok: false,
      details: ["Request body must be a JSON object."]
    };
  }

  const candidate = payload as Record<string, unknown>;
  const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
  const email = typeof candidate.email === "string" ? candidate.email.trim() : "";

  if (!name) {
    details.push("name must be a non-empty string.");
  }

  if (!email) {
    details.push("email must be a non-empty string.");
  } else if (!email.includes("@")) {
    details.push("email must include an @ sign.");
  }

  if (details.length > 0) {
    return { ok: false, details };
  }

  return {
    ok: true,
    data: { name, email }
  };
}

export default router;
