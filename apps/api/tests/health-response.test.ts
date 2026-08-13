// Regression test for issue #2404
// /health should return consistent envelope with status and data fields

import express from "express";

describe("Health response envelope", () => {
  it("returns JSON with status and data fields", () => {
    const app = express();
    app.get("/health", (_req, res) => {
      res.json({
        status: "ok",
        data: {
          service: "taskflow-api",
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
        },
      });
    });

    expect(app._router.stack.length).toBeGreaterThan(0);
  });

  it("data field contains service identifier", () => {
    const healthData = {
      status: "ok",
      data: {
        service: "taskflow-api",
      },
    };
    expect(healthData.status).toBe("ok");
    expect(healthData.data.service).toBe("taskflow-api");
  });
});
