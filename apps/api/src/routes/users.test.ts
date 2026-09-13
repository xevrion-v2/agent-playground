import { test } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { createServer } from "node:http";
import usersRouter from "./users.js";

// Integration tests: boot a real Express app with the users router and
// assert HTTP-level behaviour for each #2207 acceptance criterion.
// No external test deps (uses node:test + built-in fetch).

async function callApp(app: express.Express, method: string, body?: unknown) {
  const srv = app.listen(0);
  await new Promise<void>((r) => srv.once("listening", () => r()));
  const addr = srv.address();
  const port = typeof addr === "object" && addr ? addr.port : 0;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/users`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, body: data };
  } finally {
    await new Promise<void>((r) => srv.close(() => r()));
  }
}

function app() {
  const a = express();
  a.use(express.json());
  a.use("/users", usersRouter);
  return a;
}

test("POST /users rejects non-object JSON (array)", async () => {
  const r = await callApp(app(), "POST", [1, 2]);
  assert.equal(r.status, 400);
});
test("POST /users rejects null", async () => {
  const r = await callApp(app(), "POST", null);
  assert.equal(r.status, 400);
});
test("POST /users rejects primitives", async () => {
  const r = await callApp(app(), "POST", "hi");
  assert.equal(r.status, 400);
});
test("POST /users rejects missing email", async () => {
  const r = await callApp(app(), "POST", { name: "x" });
  assert.equal(r.status, 400);
});
test("POST /users rejects invalid email", async () => {
  const r = await callApp(app(), "POST", { email: "nope" });
  assert.equal(r.status, 400);
});
test("POST /users accepts valid email, returns server-generated id", async () => {
  const r = await callApp(app(), "POST", { email: "a@b.com", name: "Mazen" });
  assert.equal(r.status, 201);
  assert.ok(r.body.data?.id);
  assert.equal(r.body.data?.email, "a@b.com");
  assert.equal(r.body.data?.name, "Mazen");
});
test("POST /users ignores client id + extra fields", async () => {
  const r = await callApp(app(), "POST", { id: "evil", email: "x@y.com", role: "admin" });
  assert.equal(r.status, 201);
  assert.equal(r.body.data?.role, undefined);
  assert.notEqual(r.body.data?.id, "evil");
});
test("POST /users normalizes email lowercase + trim", async () => {
  const r = await callApp(app(), "POST", { email: "  A@B.COM  " });
  assert.equal(r.status, 201);
  assert.equal(r.body.data?.email, "a@b.com");
});
