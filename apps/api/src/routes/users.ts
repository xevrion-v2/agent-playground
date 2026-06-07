import { Router, Request, Response } from "express";
import { sendBadRequest } from "../helpers/errors";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
    sendBadRequest(res, "Invalid request body. Expected a JSON object with user fields.");
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
