import { Router, Request, Response } from "express";

const router = Router();

// Lightweight API error response helper
function apiError(res: Response, message: string, status = 400): void {
  res.status(status).json({ error: true, message });
}

router.get("/", (_req: Request, res: Response) => {
  try {
    res.json({
      data: [],
      message: "User listing is not implemented yet.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    apiError(res, message, 500);
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    res.status(201).json({
      data: {
        id: "stub-user-id",
        ...req.body,
      },
      message: "User creation is not implemented yet.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    apiError(res, message, 500);
  }
});

export default router;
