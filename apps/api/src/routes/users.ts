import { Router } from "express";

import { sendApiError } from "../lib/apiError.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    return sendApiError(res, 400, "Request body must be a JSON object.");
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
