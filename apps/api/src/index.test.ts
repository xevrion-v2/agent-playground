import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app";

describe("API", () => {
  it("responds with JSON 404 for unknown routes", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.status).toBe(404);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toEqual({ error: "Not found" });
  });

  it("leaves /health unchanged", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", service: "taskflow-api" });
  });

  it("leaves /users unchanged", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message");
  });
});