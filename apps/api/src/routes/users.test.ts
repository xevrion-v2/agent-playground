import test from "node:test";
import assert from "node:assert/strict";
import express from "express";

import usersRouter from "./users.ts";

test("GET /users returns the current stub list response", async () => {
  await withUsersServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(payload, {
      data: [],
      message: "User listing is not implemented yet."
    });
  });
});

test("POST /users accepts a valid user payload", async () => {
  await withUsersServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "  Ada Lovelace  ",
        email: "  ada@example.com  "
      })
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.deepEqual(payload, {
      data: {
        id: "stub-user-id",
        name: "Ada Lovelace",
        email: "ada@example.com"
      },
      message: "User creation is not implemented yet."
    });
  });
});

test("POST /users rejects non-object payloads", async () => {
  await withUsersServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify([])
    });
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(payload, {
      error: "Invalid user payload",
      details: ["Request body must be a JSON object."]
    });
  });
});

test("POST /users rejects missing required fields", async () => {
  await withUsersServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({})
    });
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(payload, {
      error: "Invalid user payload",
      details: [
        "name must be a non-empty string.",
        "email must be a non-empty string."
      ]
    });
  });
});

test("POST /users rejects malformed email values", async () => {
  await withUsersServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Ada Lovelace",
        email: "ada.example.com"
      })
    });
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(payload, {
      error: "Invalid user payload",
      details: ["email must include an @ sign."]
    });
  });
});

async function withUsersServer(run: (baseUrl: string) => Promise<void>) {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const server = app.listen(0, "127.0.0.1");

  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Expected test server to listen on a local port");
  }

  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}
