import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { Server } from "http";

const PORT = 9876;

let server: Server;

beforeAll(async () => {
  const { app } = await import("../app");
  server = app.listen(PORT);
});

afterAll(async () => {
  if (server) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

describe("JSON error handler", () => {
  it("returns JSON 400 for malformed JSON in /users POST", async () => {
    const res = await fetch(`http://localhost:${PORT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{broken",
    });

    expect(res.status).toBe(400);
    expect(res.headers.get("content-type")).toMatch(/json/);
    const body = await res.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toBe("Invalid JSON request body");
  });

  it("returns JSON 400 for garbage body in /users POST", async () => {
    const res = await fetch(`http://localhost:${PORT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "this is not json at all",
    });

    expect(res.status).toBe(400);
    expect(res.headers.get("content-type")).toMatch(/json/);
    const body = await res.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toBe("Invalid JSON request body");
  });

  it("still returns 200 for valid JSON in /health GET", async () => {
    const res = await fetch(`http://localhost:${PORT}/health`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/json/);
  });

  it("still returns 200 for valid JSON in /users POST", async () => {
    const res = await fetch(`http://localhost:${PORT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "test" }),
    });

    expect(res.status).toBe(201);
  });
});
