import assert from "node:assert/strict";

import app from "../src/app";

const server = app.listen(0);

function baseUrl() {
  const address = server.address();
  assert(address && typeof address === "object");
  return `http://127.0.0.1:${address.port}`;
}

async function readJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

async function main() {
  const root = baseUrl();

  const health = await fetch(`${root}/health`);
  assert.equal(health.status, 200);
  assert.equal(health.headers.get("content-type")?.includes("application/json"), true);

  const users = await fetch(`${root}/users`);
  assert.equal(users.status, 200);
  const usersJson = await readJson(users);
  assert.deepEqual(usersJson.data, []);

  const valid = await fetch(`${root}/users`, {
    body: JSON.stringify({ email: "ADA@Example.COM", name: " Ada Lovelace " }),
    headers: { "content-type": "application/json" },
    method: "POST"
  });
  assert.equal(valid.status, 201);
  const validJson = await readJson(valid);
  assert.deepEqual(validJson.data, {
    email: "ada@example.com",
    id: "stub-user-id",
    name: "Ada Lovelace"
  });

  const unknownField = await fetch(`${root}/users`, {
    body: JSON.stringify({
      email: "ada@example.com",
      id: "client-owned-id",
      name: "Ada",
      role: "admin"
    }),
    headers: { "content-type": "application/json" },
    method: "POST"
  });
  assert.equal(unknownField.status, 400);
  const unknownFieldJson = await readJson(unknownField);
  assert.equal(unknownFieldJson.error, "Invalid user payload");
  assert.match(String(unknownFieldJson.message), /Unsupported user field/u);

  const invalidEmail = await fetch(`${root}/users`, {
    body: JSON.stringify({ email: "not-an-email", name: "Ada" }),
    headers: { "content-type": "application/json" },
    method: "POST"
  });
  assert.equal(invalidEmail.status, 400);

  const missingName = await fetch(`${root}/users`, {
    body: JSON.stringify({ email: "ada@example.com", name: "   " }),
    headers: { "content-type": "application/json" },
    method: "POST"
  });
  assert.equal(missingName.status, 400);
}

try {
  await main();
} finally {
  server.close();
}
