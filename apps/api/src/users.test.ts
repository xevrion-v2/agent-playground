import assert from "node:assert/strict";
import test from "node:test";
import http from "node:http";
import express from "express";

import usersRouter from "./routes/users.js";

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

async function withServer(
  handler: express.Express,
  fn: (baseUrl: string) => Promise<void>
): Promise<void> {
  const server = http.createServer(handler);
  await new Promise<void>((r) => server.listen(0, r));
  const { port } = server.address() as { port: number };
  try {
    await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
  }
}

test("POST /users succeeds with valid email and normalizes fields", async () => {
  await withServer(makeApp(), async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "client-id",
        email: "  User@Example.com  ",
        name: "  Ada  Lovelace ",
        role: "admin",
      }),
    });
    const body = await res.json();
    assert.equal(res.status, 201);
    assert.notEqual(body.data.id, "client-id");
    assert.equal(body.data.email, "user@example.com");
    assert.equal(body.data.name, "Ada Lovelace");
    assert.equal(body.data.role, undefined);
    assert.equal(body.message, "User created successfully.");
  });
});

test("POST /users succeeds with email only", async () => {
  await withServer(makeApp(), async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "ada@example.com" }),
    });
    const body = await res.json();
    assert.equal(res.status, 201);
    assert.equal(body.data.email, "ada@example.com");
    assert.equal(body.data.name, undefined);
  });
});

test("POST /users rejects non-object bodies", async () => {
  await withServer(makeApp(), async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(["not-an-object"]),
    });
    assert.equal(res.status, 400);
  });
});

test("POST /users rejects missing email", async () => {
  await withServer(makeApp(), async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Ada" }),
    });
    assert.equal(res.status, 400);
  });
});

test("POST /users rejects invalid email format", async () => {
  await withServer(makeApp(), async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid-email" }),
    });
    assert.equal(res.status, 400);
  });
});

test("POST /users rejects non-string name", async () => {
  await withServer(makeApp(), async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "ada@example.com", name: 123 }),
    });
    assert.equal(res.status, 400);
  });
});
