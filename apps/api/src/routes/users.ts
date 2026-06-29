import { Router } from "express";

import { sendApiError } from "../utils/apiError";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return sendApiError(res, 400, "User payload must be an object.");
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
