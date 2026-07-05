import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import express from "express";
import type { Server } from "node:http";

import usersRouter from "./users";

let server: Server;
let baseUrl: string;

before(async () => {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const address = server.address();
      assert(address && typeof address === "object");
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("POST /users rejects empty JSON payloads", async () => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({})
  });

  const body = await response.json();

  assert.equal(response.status, 400);
  assert.deepEqual(body, {
    error: {
      code: "invalid_user_payload",
      message: "User creation requires at least one user field."
    }
  });
});

test("POST /users preserves the successful stub response", async () => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "person@example.com" })
  });

  const body = await response.json();

  assert.equal(response.status, 201);
  assert.equal(body.data.id, "stub-user-id");
  assert.equal(body.data.email, "person@example.com");
});
