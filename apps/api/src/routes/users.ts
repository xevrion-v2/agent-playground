import { Router, Request, Response } from "express";

import { sendApiError } from "../helpers/apiError";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    sendApiError(res, 400, "Request body must be a JSON object.", "BAD_REQUEST");
    return;
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
