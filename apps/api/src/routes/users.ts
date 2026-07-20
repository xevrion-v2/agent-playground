import { Router } from "express";

import { sendApiError } from "../http/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendApiError(
      res,
      400,
      "invalid_user_payload",
      "A user payload is required."
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
