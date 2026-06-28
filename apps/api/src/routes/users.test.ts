import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import type { Server } from "node:http";

import express from "express";

import usersRouter from "./users.js";

let server: Server;
let baseUrl: string;

before(async () => {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  assert(address && typeof address !== "string");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("user routes", () => {
  it("lists users with the current empty stub response", async () => {
    const response = await fetch(`${baseUrl}/users`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body.data, []);
    assert.equal(typeof body.message, "string");
    assert.match(body.message, /not implemented/i);
  });

  it("creates a stub user while preserving submitted fields", async () => {
    const payload = {
      email: "alice@example.com",
      name: "Alice Example"
    };

    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.deepEqual(body.data, {
      id: "stub-user-id",
      ...payload
    });
    assert.equal(typeof body.message, "string");
    assert.match(body.message, /not implemented/i);
  });
});
