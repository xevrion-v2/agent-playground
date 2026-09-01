import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import app from "../src/index";

async function postUser(body: unknown) {
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Test server did not expose a TCP address.");
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/users`, {
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
      method: "POST"
    });
    const json = await response.json();

    return { body: json, status: response.status };
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

test("POST /users rejects non-object JSON bodies", async () => {
  const response = await postUser(["user@example.com"]);

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Request body must be a JSON object.");
});

test("POST /users requires a valid email", async () => {
  const response = await postUser({ email: "not-an-email" });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "A valid email is required.");
});

test("POST /users normalizes accepted email and name values", async () => {
  const response = await postUser({
    email: "  USER@Example.COM  ",
    name: "  Ada   Lovelace  "
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.email, "user@example.com");
  assert.equal(response.body.data.name, "Ada Lovelace");
});

test("POST /users ignores client-controlled id and unrelated fields", async () => {
  const response = await postUser({
    admin: true,
    email: "person@example.com",
    id: "client-id",
    name: "Person"
  });

  assert.equal(response.status, 201);
  assert.deepEqual(response.body.data, {
    email: "person@example.com",
    id: "stub-user-id",
    name: "Person"
  });
});
