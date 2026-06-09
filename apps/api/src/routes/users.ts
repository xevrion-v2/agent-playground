import { Router } from "express";

const router = Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isUserPayload(body: unknown): body is Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return false;
  }

  const { email } = body as Record<string, unknown>;
  return email === undefined || (typeof email === "string" && emailPattern.test(email));
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isUserPayload(req.body)) {
    return res.status(400).json({
      error: {
        message: "Invalid user payload."
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
