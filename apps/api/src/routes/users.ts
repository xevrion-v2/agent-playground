import { Router } from "express";

import { ApiError } from "../utils/errorHandler";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res, next) => {
  try {
    const { body } = req;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new ApiError(400, "Request body must be a JSON object.");
    }

    res.status(201).json({
      data: {
        id: "stub-user-id",
        ...body
      },
      message: "User creation is not implemented yet."
    });
  } catch (err) {
    next(err);
  }
});

export default router;
