import { Router } from "express";

const router = Router();

type UserCreatePayload = {
  email?: string;
  name?: string;
};

function validateUserCreatePayload(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "User payload must be an object.";
  }

  const payload = body as Record<string, unknown>;
  if ("email" in payload && typeof payload.email !== "string") {
    return "User email must be a string when provided.";
  }

  if ("name" in payload && typeof payload.name !== "string") {
    return "User name must be a string when provided.";
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
  const validationError = validateUserCreatePayload(req.body);
  if (validationError) {
    return res.status(400).json({
      error: {
        message: validationError
      }
    });
  }

  const payload = req.body as UserCreatePayload;

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...payload
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
