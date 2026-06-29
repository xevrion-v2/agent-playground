import { Router, Request, Response, NextFunction } from "express";
import { AppError } from "../errorHandler";

const router = Router();

// Simple async wrapper to forward errors to the error handler
function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

router.get("/", asyncHandler(async (_req, res) => {
  // Simulate a failing database call that throws
  throw new AppError("User listing is not implemented yet.", 501);
}));

router.post("/", asyncHandler(async (req, res) => {
  res.status(201).json({
    status: "ok",
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
}));

export default router;
