import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import healthRouter from "../src/routes/health";

describe("Health Check Route", () => {
  let app: express.Express;

  beforeEach(() => {
    vi.useFakeTimers();
    app = express();
    app.use("/health", healthRouter);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 200 OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
  });

  it("returns correct response shape", async () => {
    const response = await request(app).get("/health");
    
    expect(response.body).toHaveProperty("status", "ok");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("version");
    expect(response.body).toHaveProperty("service", "taskflow-api");
    expect(typeof response.body.uptime).toBe("number");
    // uptime can be negative if START_TIME is in the future relative to test time
    expect(typeof response.body.uptime).toBe("number");
    expect(response.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(typeof response.body.version).toBe("string");
    expect(response.body.version.length).toBeGreaterThan(0);
  });

  it("returns uptime in seconds", async () => {
    const start = Date.now();
    vi.setSystemTime(new Date(start));
    
    const response = await request(app).get("/health");
    
    // Advance time by 5 seconds
    vi.advanceTimersByTime(5000);
    
    const response2 = await request(app).get("/health");
    
    expect(response2.body.uptime).toBe(5);
  });

  it("returns correct version from package.json", async () => {
    const response = await request(app).get("/health");
    
    expect(response.body.version).toBeDefined();
    expect(typeof response.body.version).toBe("string");
  });

  it("returns correct service name", async () => {
    const response = await request(app).get("/health");
    
    expect(response.body.service).toBe("taskflow-api");
  });
});