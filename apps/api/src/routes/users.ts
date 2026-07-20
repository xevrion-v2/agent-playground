import { Router } from "express";

import { sendApiError } from "../utils/api-error";

const router = Router();

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isJsonObject(req.body)) {
    sendApiError(
      res,
      400,
      "invalid_request_body",
      "Request body must be a JSON object."
    );
    return;
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
