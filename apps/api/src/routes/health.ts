import { Router, Request, Response } from "express";

const router = Router();

const START_TIME = Date.now();
const VERSION = process.env.npm_package_version || "0.1.0";

/**
 * Health check response shape
 */
export interface HealthCheckResponse {
  status: "ok" | "degraded" | "down";
  timestamp: string;
  uptime: number;
  version: string;
  service: string;
}

/**
 * GET /health
 * Returns standardized health check response
 * Shape: { status, timestamp, uptime, version, service }
 */
router.get("/", (_req: Request, res: Response) => {
  const uptime = Math.floor((Date.now() - START_TIME) / 1000);

  const response: HealthCheckResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime,
    version: VERSION,
    service: "taskflow-api",
  };

  res.json(response);
});

export default router;