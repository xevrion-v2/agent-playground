import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express, { type Express } from "express";
import usersRouter from "../routes/users";

let app: Express;
let server: any;
let baseUrl: string;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  return new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

afterAll(() => {
  if (server) server.close();
});

async function fetchJson(path: string, options?: {
  method?: string;
  body?: unknown;
}): Promise<{ status: number; body: any }> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: options?.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });
  const text = await res.text();
  let body: any;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text };
  }
  return { status: res.status, body };
}

describe("GET /users", () => {
  it("returns 200 status", async () => {
    const { status } = await fetchJson("/users");
    expect(status).toBe(200);
  });

  it("returns a data array", async () => {
    const { body } = await fetchJson("/users");
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("returns a message string", async () => {
    const { body } = await fetchJson("/users");
    expect(body).toHaveProperty("message");
    expect(typeof body.message).toBe("string");
  });

  it("returns an empty data array", async () => {
    const { body } = await fetchJson("/users");
    expect(body.data).toHaveLength(0);
  });
});

describe("POST /users", () => {
  it("returns 201 status", async () => {
    const { status } = await fetchJson("/users", {
      method: "POST",
      body: { name: "Test", email: "test@test.com" },
    });
    expect(status).toBe(201);
  });

  it("returns posted data wrapped in data field with stub id", async () => {
    const { body } = await fetchJson("/users", {
      method: "POST",
      body: { name: "Alice", email: "alice@example.com" },
    });
    expect(body).toHaveProperty("data");
    expect(body.data).toHaveProperty("id", "stub-user-id");
    expect(body.data).toHaveProperty("name", "Alice");
    expect(body.data).toHaveProperty("email", "alice@example.com");
  });

  it("returns a success message", async () => {
    const { body } = await fetchJson("/users", {
      method: "POST",
      body: { name: "Bob" },
    });
    expect(body).toHaveProperty("message");
    expect(typeof body.message).toBe("string");
  });

  it("accepts any JSON body and echoes it back", async () => {
    const payload = { name: "Charlie", email: "charlie@test.com", role: "admin" };
    const { body } = await fetchJson("/users", {
      method: "POST",
      body: payload,
    });
    expect(body.data).toMatchObject(payload);
  });

  it("handles an empty JSON object body", async () => {
    const { body } = await fetchJson("/users", {
      method: "POST",
      body: {},
    });
    expect(body).toHaveProperty("data");
    expect(body.data).toHaveProperty("id", "stub-user-id");
  });

  it("handles a minimal body with just name", async () => {
    const { body } = await fetchJson("/users", {
      method: "POST",
      body: { name: "Minimal" },
    });
    expect(body.data).toHaveProperty("id", "stub-user-id");
    expect(body.data).toHaveProperty("name", "Minimal");
  });
});
