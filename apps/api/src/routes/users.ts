import { Router } from "express";

import { sendError } from "../utils/errors";

const router = Router();

function isObjectBody(body: unknown): body is Record<string, unknown> {
  return typeof body === "object" && body !== null && !Array.isArray(body);
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isObjectBody(req.body)) {
    return sendError(
      res,
      400,
      "invalid_user_payload",
      "User creation requires a JSON object request body."
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
