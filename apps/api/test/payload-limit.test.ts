import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import { defaultPayloadLimit } from "../src/middleware/payloadLimit";

describe("Payload Limit Middleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(defaultPayloadLimit);
    app.post("/test", (req, res) => {
      res.json({ ok: true });
    });
  });

  it("allows requests under 10KB", async () => {
    const payload = { data: "a".repeat(5000) }; // ~5KB
    const response = await request(app).post("/test").send(payload);
    expect(response.status).toBe(200);
  });

  it("rejects requests over 10KB with 413", async () => {
    const payload = { data: "a".repeat(15000) }; // ~15KB
    const response = await request(app).post("/test").send(payload);
    
    expect(response.status).toBe(413);
    expect(response.body.error).toBe("PayloadTooLarge");
    expect(response.body.code).toBe("PAYLOAD_TOO_LARGE");
    expect(response.body.statusCode).toBe(413);
    expect(response.body.message).toBe("Payload too large");
  });

  it("rejects exactly 10KB+1 byte", async () => {
    const payload = { data: "a".repeat(10 * 1024 + 1) }; // 10KB + 1 byte
    const response = await request(app).post("/test").send(payload);
    
    expect(response.status).toBe(413);
    expect(response.body.error).toBe("PayloadTooLarge");
  });

  it("allows payloads up to 10KB limit", async () => {
    // Account for JSON overhead (object structure + quotes + field name)
    // 10KB = 10240 bytes, minus JSON overhead (~20 bytes for {"data":""})
    const payload = { data: "a".repeat(10 * 1024 - 30) };
    const response = await request(app).post("/test").send(payload);
    
    expect(response.status).toBe(200);
  });

  it("returns correct error response structure", async () => {
    const payload = { data: "a".repeat(15000) };
    const response = await request(app).post("/test").send(payload);
    
    expect(response.body).toHaveProperty("error", "PayloadTooLarge");
    expect(response.body).toHaveProperty("message", "Payload too large");
    expect(response.body).toHaveProperty("code", "PAYLOAD_TOO_LARGE");
    expect(response.body).toHaveProperty("statusCode", 413);
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("path", "/test");
    expect(response.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it("allows GET requests without body", async () => {
    const app = express();
    app.use(express.json());
    app.use(defaultPayloadLimit);
    app.get("/health", (req, res) => res.json({ ok: true }));
    
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
  });

  it("allows empty POST requests", async () => {
    const response = await request(app).post("/test").send({});
    expect(response.status).toBe(200);
  });

  it("handles custom maxSize option", async () => {
    const { payloadLimit } = await import("../src/middleware/payloadLimit");
    
    const app = express();
    app.use(express.json());
    app.use(payloadLimit({ maxSize: 1024 })); // 1KB limit
    app.post("/test", (req, res) => res.json({ ok: true }));
    
    const payload = { data: "a".repeat(2000) }; // 2KB
    const response = await request(app).post("/test").send(payload);
    
    expect(response.status).toBe(413);
  });
});