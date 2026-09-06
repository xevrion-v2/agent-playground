import test from "node:test";
import assert from "node:assert/strict";
import { app } from "../index.js";

async function withServer(fn: (port: number) => Promise<void>) {
  const server = app.listen(0);
  await new Promise<void>((resolve, reject) => {
    server.once("listening", () => resolve());
    server.once("error", reject);
  });
  const { port } = server.address() as { port: number };
  try {
    await fn(port);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("POST /users with malformed JSON returns a JSON 400 response", async () => {
  await withServer(async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not valid json"
    });
    assert.equal(response.status, 400);
    const contentType = response.headers.get("content-type") ?? "";
    assert.match(contentType, /application\/json/);
    const payload = await response.json() as { error?: string };
    assert.equal(payload.error, "Invalid JSON request body");
  });
});

test("POST /users with malformed JSON does not fall through to the route handler", async () => {
  await withServer(async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{\"a\":}"
    });
    assert.equal(response.status, 400);
    const payload = await response.json() as { data?: unknown };
    assert.equal(payload.data, undefined, "Route stub should not have run");
  });
});

test("GET /health still returns 200 with valid JSON", async () => {
  await withServer(async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(response.status, 200);
    const payload = await response.json() as { status?: string };
    assert.equal(payload.status, "ok");
  });
});

test("POST /users with valid JSON still returns 201 from the route", async () => {
  await withServer(async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Ada" })
    });
    assert.equal(response.status, 201);
    const payload = await response.json() as { data?: { name?: string } };
    assert.equal(payload.data?.name, "Ada");
  });
});
