import { test } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import type { AddressInfo } from "node:net";

import usersRouter from "./users.js";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

async function startServer() {
  const app = createApp();
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.on("listening", () => resolve()));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolve, reject) =>
        server.close((err) => (err ? reject(err) : resolve()))
      )
  };
}

async function postUsers(url: string, body: string, contentType = "application/json") {
  return fetch(`${url}/users`, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body
  });
}

test("POST /users rejects non-object JSON bodies (array)", async () => {
  const srv = await startServer();
  try {
    const res = await postUsers(srv.url, JSON.stringify([{ email: "a@b.co" }]));
    assert.equal(res.status, 400);
    const data = (await res.json()) as { error: string };
    assert.match(data.error, /JSON object/);
  } finally {
    await srv.close();
  }
});

test("POST /users rejects non-object JSON bodies (string)", async () => {
  const srv = await startServer();
  try {
    const res = await postUsers(srv.url, JSON.stringify("hello"));
    assert.equal(res.status, 400);
  } finally {
    await srv.close();
  }
});

test("POST /users rejects null body", async () => {
  const srv = await startServer();
  try {
    const res = await postUsers(srv.url, JSON.stringify(null));
    assert.equal(res.status, 400);
  } finally {
    await srv.close();
  }
});

test("POST /users requires a valid email", async () => {
  const srv = await startServer();
  try {
    const res = await postUsers(srv.url, JSON.stringify({ name: "Alice" }));
    assert.equal(res.status, 400);
    const bad = await postUsers(srv.url, JSON.stringify({ email: "not-an-email" }));
    assert.equal(bad.status, 400);
    const empty = await postUsers(srv.url, JSON.stringify({ email: "   " }));
    assert.equal(empty.status, 400);
  } finally {
    await srv.close();
  }
});

test("POST /users normalizes email (trim + lowercase) and name (collapse whitespace)", async () => {
  const srv = await startServer();
  try {
    const res = await postUsers(
      srv.url,
      JSON.stringify({ email: "  Alice@Example.COM  ", name: "  Alice   Smith  " })
    );
    assert.equal(res.status, 201);
    const data = (await res.json()) as { data: { email: string; name: string; id: string } };
    assert.equal(data.data.email, "alice@example.com");
    assert.equal(data.data.name, "Alice Smith");
    assert.ok(data.data.id && typeof data.data.id === "string");
  } finally {
    await srv.close();
  }
});

test("POST /users ignores client-controlled id and unrelated fields", async () => {
  const srv = await startServer();
  try {
    const res = await postUsers(
      srv.url,
      JSON.stringify({
        id: "client-supplied-id",
        email: "bob@example.com",
        isAdmin: true,
        role: "superuser",
        extra: { nested: 1 }
      })
    );
    assert.equal(res.status, 201);
    const data = (await res.json()) as { data: Record<string, unknown> };
    assert.notEqual(data.data.id, "client-supplied-id");
    assert.equal(data.data.email, "bob@example.com");
    assert.equal(data.data.isAdmin, undefined);
    assert.equal(data.data.role, undefined);
    assert.equal(data.data.extra, undefined);
    assert.deepEqual(Object.keys(data.data).sort(), ["email", "id"].sort());
  } finally {
    await srv.close();
  }
});

test("POST /users omits name when not a non-empty string", async () => {
  const srv = await startServer();
  try {
    const res = await postUsers(
      srv.url,
      JSON.stringify({ email: "c@example.com", name: 123 })
    );
    assert.equal(res.status, 201);
    const data = (await res.json()) as { data: Record<string, unknown> };
    assert.equal(data.data.name, undefined);
  } finally {
    await srv.close();
  }
});
