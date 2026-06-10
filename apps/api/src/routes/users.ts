import { Router, Request, Response } from "express";
import { sendError } from "../utils/errorHandler";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  try {
    res.json({
      data: [],
      message: "User listing is not implemented yet."
    });
  } catch (err) {
    return sendError(res, "Failed to list users", 500);
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    res.status(201).json({
      data: {
        id: "stub-user-id",
        ...req.body
      },
      message: "User creation is not implemented yet."
    });
  } catch (err) {
    return sendError(res, "Failed to create user", 500);
  }
});

export default router;
