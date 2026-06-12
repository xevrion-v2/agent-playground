import { Router } from "express";

import { sendErrorResponse } from "../utils/errorResponse";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendErrorResponse(res, {
      code: "EMPTY_REQUEST_BODY",
      message: "Request body is required to create a user.",
      statusCode: 400
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
