import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import healthRouter from "./health";

const app = express();
app.use("/health", healthRouter);

describe("GET /health", () => {
  it("returns 200 with normalized envelope", async () => {
    const res = await request(app).get("/health").expect(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("service", "taskflow-api");
    expect(res.body.data).toHaveProperty("timestamp");
    expect(res.body.data).toHaveProperty("uptime");
  });
});
