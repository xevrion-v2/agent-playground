import { Router, Request, Response, NextFunction } from "express";
import { sendError } from "../utils/errorHandler";

const router = Router();

router.get("/", (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Placeholder: in production this would query the database
    res.json({
      data: [],
      message: "User listing is not implemented yet."
    });
  } catch (err) {
    sendError(res, 500, "Failed to fetch users", "INTERNAL_ERROR");
  }
});

router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
