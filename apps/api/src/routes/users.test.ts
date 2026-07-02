import assert from "node:assert";
import http from "node:http";
import test, { after, beforeEach } from "node:test";

import { app } from "../index";
import { resetUsersForTest } from "./users";

const PORT = 5600;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let server: http.Server;

beforeEach(() => {
  resetUsersForTest();
});

test("GET /users returns an empty list initially", async () => {
  const res = await fetch(`${BASE_URL}/users`);
  assert.equal(res.status, 200);

  const payload = (await res.json()) as { data: unknown[]; message: string };
  assert.deepStrictEqual(payload.data, []);
  assert.equal(payload.message, "Users fetched.");
});

test("POST /users creates a new user", async () => {
  const body = { name: "Alice", email: "alice@example.com" };
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });

  assert.equal(res.status, 201);
  const payload = (await res.json()) as { data: { id: string; name: string; email: string }; message: string };
  assert.equal(payload.message, "User created.");
  assert.equal(payload.data.name, body.name);
  assert.equal(payload.data.email, body.email);
  assert.match(payload.data.id, /^user-\d+-\d+$/);
});

test("POST /users rejects invalid payload", async () => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Alice" })
  });

  assert.equal(res.status, 400);
  const payload = (await res.json()) as { message: string };
  assert.equal(payload.message, "name and email are required.");
});

const serverPromise = new Promise<void>((resolve, reject) => {
  server = app.listen(PORT, "127.0.0.1", () => {
    resolve();
  });
  server.once("error", reject);
});

await serverPromise;

after(() => {
  server.close();
});
