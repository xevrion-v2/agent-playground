import { Router, Request, Response } from "express";
import { errorResponse } from "../utils/errorResponse";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === "0" || !/^\d+$/.test(id)) {
    res.status(400).json(errorResponse("Invalid user ID", 400));
    return;
  }
  res.json({
    data: { id },
    message: "User detail is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
