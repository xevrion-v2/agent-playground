import { Router, Request, Response } from "express";
import { apiError } from "../lib/errors";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return apiError(res, 400, "Invalid request body", ["Request body must be a JSON object"]);
  }

  res.status(201).json({
    status: "ok",
    data: {
      id: "stub-user-id",
      ...req.body,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
