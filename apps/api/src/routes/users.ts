import { Router } from "express";

import { sendApiError } from "../utils/apiError";

const router = Router();

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isPlainObject(req.body)) {
    return sendApiError(
      res,
      400,
      "INVALID_USER_PAYLOAD",
      "User creation requires a JSON object body."
    );
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
