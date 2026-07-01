import { Router } from "express";

const router = Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidationError = {
  field: "body" | "email";
  message: string;
};

function validateUserPayload(body: unknown): ValidationError | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      field: "body",
      message: "Request body must be a JSON object."
    };
  }

  const { email } = body as Record<string, unknown>;

  if (typeof email !== "string" || !emailPattern.test(email)) {
    return {
      field: "email",
      message: "email must be a valid email address."
    };
  }

  return null;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const validationError = validateUserPayload(req.body);

  if (validationError) {
    return res.status(400).json({
      error: {
        field: validationError.field,
        message: validationError.message
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

export default router;
