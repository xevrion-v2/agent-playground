import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import usersRouter from "./src/routes/users";
import type { Server } from "http";

let server: Server;
let baseUrl: string;

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

beforeAll(async () => {
  const app = createApp();
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const addr = server.address() as { port: number };
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

afterAll(() => {
  server?.close();
});

async function fetchApi(path: string, options?: RequestInit) {
  const res = await fetch(`${baseUrl}${path}`, options);
  const data = await res.json();
  return { status: res.status, data };
}

describe("GET /users", () => {
  it("should return 200 with data array and message", async () => {
    const { status, data } = await fetchApi("/users");
    expect(status).toBe(200);
    expect(data).toHaveProperty("data");
    expect(data).toHaveProperty("message");
    expect(Array.isArray(data.data)).toBe(true);
  });

  it("should return empty data array (stub)", async () => {
    const { data } = await fetchApi("/users");
    expect(data.data).toEqual([]);
  });
});

describe("POST /users", () => {
  it("should return 201 with stub user ID", async () => {
    const { status, data } = await fetchApi("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "test@example.com" }),
    });
    expect(status).toBe(201);
    expect(data.data).toHaveProperty("id", "stub-user-id");
    expect(data.data.name).toBe("Test");
  });

  it("should return 201 with empty body (stub doesn't validate)", async () => {
    const { status } = await fetchApi("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(status).toBe(201);
  });

  it("should include a descriptive message", async () => {
    const { data } = await fetchApi("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "X" }),
    });
    expect(data.message).toBeDefined();
    expect(typeof data.message).toBe("string");
  });
});
