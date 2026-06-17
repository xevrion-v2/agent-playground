import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "taskflow-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
