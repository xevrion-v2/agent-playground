import { Router } from "express";

import { sendError } from "../utils/errorResponse";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || Array.isArray(req.body) || typeof req.body !== "object") {
    return sendError(res, 400, "User payload must be a JSON object.");
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
