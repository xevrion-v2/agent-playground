import { Router } from "express";
import { asyncHandler, AppError } from "../utils/errorHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json({
      data: [],
      message: "User listing is not implemented yet.",
    });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new AppError("name and email are required", 400);
    }

    res.status(201).json({
      data: {
        id: "stub-user-id",
        ...req.body,
      },
      message: "User creation is not implemented yet.",
    });
  }),
);

export default router;
