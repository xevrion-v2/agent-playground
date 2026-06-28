import { Router } from "express";

const router = Router();

type UserCreateBody = {
  name?: unknown;
  email?: unknown;
};

function validateCreateUserBody(body: UserCreateBody) {
  if (!body || typeof body !== "object") {
    return "Request body must be an object.";
  }

  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    return "User name is required.";
  }

  if (typeof body.email !== "string" || body.email.trim().length === 0) {
    return "User email is required.";
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
  const validationError = validateCreateUserBody(req.body);

  if (validationError) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: validationError
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
