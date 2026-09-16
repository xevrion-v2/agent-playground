import { test } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { createServer } from "node:http";
import usersRouter from "./users.js";

async function callApp(method: string, body?: unknown, headers: Record<string, string> = {}) {
  const app = express();
  app.use(express.json({ limit: "100kb" }));
  app.use("/users", usersRouter);
  const srv = app.listen(0);
  await new Promise<void>((r) => srv.once("listening", () => r()));
  const port = (srv.address() as any).port;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/users`, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return { status: res.status, bodyText: await res.text() };
  } finally {
    await new Promise<void>((r) => srv.close(() => r()));
  }
}

test("POST /users with valid payload succeeds (200/201)", async () => {
  const r = await callApp("POST", { email: "a@b.com" });
  assert.ok(r.status === 200 || r.status === 201, `expected 2xx, got ${r.status}`);
});

test("POST /users with invalid email returns 400", async () => {
  const r = await callApp("POST", { email: "nope" });
  assert.equal(r.status, 400);
});

test("POST /users with non-object body returns 400", async () => {
  const r = await callApp("POST", [1, 2, 3]);
  assert.equal(r.status, 400);
});

test("oversized JSON body (beyond 100kb) is rejected", async () => {
  // Build a payload just over the 100kb limit.
  const big = "x".repeat(200 * 1024);
  const r = await callApp("POST", { email: "a@b.com", note: big });
  // Either 413 (limit enforced) or 400 (validation) — both are safe rejections.
  assert.ok(r.status === 413 || r.status === 400, `expected rejection, got ${r.status}`);
});
