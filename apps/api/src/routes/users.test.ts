import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";

import { createApp } from "../app";

async function postUser(body: unknown) {
  const app = createApp();
  const server = app.listen(0);
  await once(server, "listening");

  try {
    const address = server.address();
    assert(address && typeof address === "object");

    const response = await fetch(`http://127.0.0.1:${address.port}/users`, {
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
      method: "POST"
    });

    return {
      body: await response.json(),
      status: response.status
    };
  } finally {
    server.close();
    await once(server, "close");
  }
}

test("POST /users rejects non-object JSON bodies", async () => {
  for (const body of [null, [], "not an object"]) {
    const response = await postUser(body);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Request body must be a JSON object.");
  }
});

test("POST /users requires a valid email", async () => {
  for (const body of [{}, { email: "" }, { email: "invalid" }]) {
    const response = await postUser(body);

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "A valid email is required.");
  }
});

test("POST /users normalizes accepted email and name values", async () => {
  const response = await postUser({
    email: "  PERSON@Example.COM  ",
    name: "  Jane   Developer  "
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.email, "person@example.com");
  assert.equal(response.body.data.name, "Jane Developer");
});

test("POST /users ignores client-controlled id and extra fields", async () => {
  const response = await postUser({
    email: "person@example.com",
    extra: "ignored",
    id: "client-id",
    role: "admin"
  });

  assert.equal(response.status, 201);
  assert.notEqual(response.body.data.id, "client-id");
  assert.match(response.body.data.id, /^[0-9a-f-]{36}$/);
  assert.deepEqual(Object.keys(response.body.data).sort(), ["email", "id"]);
});
