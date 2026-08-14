import { describe, it, before, after } from "node:test";
import * as assert from "node:assert/strict";
import { createApp } from "../app.js";
import type { Express } from "express";
import type { Server } from "http";

let app: Express;
let server: Server;
let baseUrl: string;

before(async () => {
  app = createApp();
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const addr = server.address();
      if (addr && typeof addr === "object") {
        baseUrl = `http://127.0.0.1:${addr.port}`;
      }
      resolve();
    });
  });
});

after(() => {
  server.close();
});

async function fetchJson(
  path: string,
  options?: { method?: string; body?: unknown },
): Promise<{ status: number; body: any }> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: options?.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
  const body = await res.json();
  return { status: res.status, body };
}

// ── GET /users ────────────────────────────────────────────

describe("GET /users", () => {
  it("returns 200 with an empty array and stub message", async () => {
    const { status, body } = await fetchJson("/users");
    assert.equal(status, 200);
    assert.ok(Array.isArray(body.data));
    assert.equal(body.data.length, 0);
    assert.ok(body.message.includes("not implemented"));
  });
});

// ── POST /users ───────────────────────────────────────────

describe("POST /users", () => {
  it("creates a user stub with a valid email", async () => {
    const { status, body } = await fetchJson("/users", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    assert.equal(status, 201);
    assert.equal(body.data.email, "test@example.com");
    assert.equal(body.data.id, "stub-user-id");
  });

  it("accepts an optional name field", async () => {
    const { status, body } = await fetchJson("/users", {
      method: "POST",
      body: { email: "alice@example.com", name: "Alice" },
    });
    assert.equal(status, 201);
    assert.equal(body.data.name, "Alice");
  });

  it("returns 422 when email is missing", async () => {
    const { status, body } = await fetchJson("/users", {
      method: "POST",
      body: {},
    });
    assert.equal(status, 422);
    assert.ok(body.errors.some((e: any) => e.message.includes("email")));
  });

  it("returns 422 when email is invalid", async () => {
    const { status, body } = await fetchJson("/users", {
      method: "POST",
      body: { email: "not-an-email" },
    });
    assert.equal(status, 422);
    assert.ok(body.errors.some((e: any) => e.message.includes("valid email")));
  });

  it("returns 422 when email is not a string", async () => {
    const { status, body } = await fetchJson("/users", {
      method: "POST",
      body: { email: 123 },
    });
    assert.equal(status, 422);
    assert.ok(body.errors.some((e: any) => e.message.includes("email")));
  });

  it("returns 422 for unknown fields", async () => {
    const { status, body } = await fetchJson("/users", {
      method: "POST",
      body: { email: "ok@example.com", admin: true, role: "super" },
    });
    assert.equal(status, 422);
    assert.ok(body.errors.some((e: any) => e.message.includes("unknown field")));
  });

  it("ignores extra id field (treated as unknown)", async () => {
    const { status } = await fetchJson("/users", {
      method: "POST",
      body: { email: "ok@example.com", id: "hacker-id" },
    });
    assert.equal(status, 422);
  });
});
