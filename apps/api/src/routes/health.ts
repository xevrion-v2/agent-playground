import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      upTime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
