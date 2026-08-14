import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../index.js";

async function withServer(fn: (base: string) => Promise<void>) {
  const app = createApp();
  const server = app.listen(0);
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const { port } = server.address() as { port: number };
  try {
    await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("POST /users rejects non-object body", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify("invalid")
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.status, "error");
  });
});

test("POST /users rejects missing email", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "test" })
    });
    assert.equal(res.status, 400);
  });
});

test("POST /users rejects invalid email format", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "not-an-email" })
    });
    assert.equal(res.status, 400);
  });
});

test("POST /users ignores client-controlled id and unknown fields", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", id: "hacked-id", admin: true })
    });
    assert.equal(res.status, 201);
    const body = await res.json();
    assert.notEqual(body.data.id, "hacked-id");
    assert.equal(body.data.admin, undefined);
  });
});

test("POST /users normalizes email to lowercase", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "Test@Example.COM" })
    });
    assert.equal(res.status, 201);
    const body = await res.json();
    assert.equal(body.data.email, "test@example.com");
  });
});
