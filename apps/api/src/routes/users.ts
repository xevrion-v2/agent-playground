import { Router } from "express";

import { sendError } from "../utils/responses";

const router = Router();

function isNonEmptyPlainObject(body: unknown): body is Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(body);

  return (prototype === Object.prototype || prototype === null) && Object.keys(body).length > 0;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isNonEmptyPlainObject(req.body)) {
    return sendError(res, 400, "Request body must be a non-empty JSON object.");
  }

  res.status(201).json({
    data: {
      ...req.body,
      id: "stub-user-id"
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
