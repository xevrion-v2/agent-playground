import { Router, Request, Response, NextFunction } from "express";
import { createApiError } from "../utils/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(createApiError(400, "Request body is required"));
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
