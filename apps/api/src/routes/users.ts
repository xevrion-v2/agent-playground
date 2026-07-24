import { Router, type Response } from "express";

const router = Router();
const invalidUserPayloadCode = "invalid_user_payload";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sendInvalidUserPayload = (res: Response, message: string) =>
  res.status(400).json({
    error: {
      code: invalidUserPayloadCode,
      message
    }
  });

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isRecord(req.body)) {
    return sendInvalidUserPayload(res, "User payload must be a JSON object.");
  }

  const email = typeof req.body.email === "string" ? req.body.email.trim() : "";

  if (!email || !isValidEmail(email)) {
    return sendInvalidUserPayload(
      res,
      "User payload must include a valid email string."
    );
  }

  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email: email.toLowerCase(),
      ...(name ? { name } : {})
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
