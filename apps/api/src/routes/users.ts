import { Router } from "express";

const router = Router();

type CreateUserPayload = {
  name: string;
  email: string;
};

function isCreateUserPayload(body: unknown): body is CreateUserPayload {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return false;
  }

  const payload = body as Partial<Record<keyof CreateUserPayload, unknown>>;

  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    typeof payload.email === "string" &&
    payload.email.trim().length > 0
  );
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isCreateUserPayload(req.body)) {
    return res.status(400).json({
      error: {
        code: "invalid_user_payload",
        message: "User creation requires non-empty name and email fields."
      }
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
      name: req.body.name.trim(),
      email: req.body.email.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
