import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import express from "express";
import type { Server } from "node:http";

import usersRouter from "./users";

type JsonBody = Record<string, unknown> | unknown[];

let server: Server;
let baseUrl: string;

async function requestUsers(body: JsonBody) {
  const response = await fetch(`${baseUrl}/users`, {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    },
    method: "POST"
  });

  return {
    body: await response.json(),
    status: response.status
  };
}

before(async () => {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));

  const address = server.address();
  assert(address && typeof address === "object");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

describe("POST /users", () => {
  it("creates a user with a server-generated id and normalized email", async () => {
    const { body, status } = await requestUsers({
      email: "  Ada.Lovelace@EXAMPLE.COM  "
    });

    assert.equal(status, 201);
    assert.match(body.data.id, /^[0-9a-f-]{36}$/i);
    assert.equal(body.data.email, "ada.lovelace@example.com");
  });

  it("normalizes optional names", async () => {
    const { body, status } = await requestUsers({
      email: "grace@example.com",
      name: "  Grace   Hopper  "
    });

    assert.equal(status, 201);
    assert.equal(body.data.name, "Grace Hopper");
  });

  it("ignores client-controlled ids and unrelated fields", async () => {
    const { body, status } = await requestUsers({
      admin: true,
      email: "user@example.com",
      id: "client-id",
      name: "User Name",
      role: "owner"
    });

    assert.equal(status, 201);
    assert.notEqual(body.data.id, "client-id");
    assert.deepEqual(Object.keys(body.data).sort(), ["email", "id", "name"]);
    assert.equal(body.data.email, "user@example.com");
  });

  it("rejects non-object JSON arrays", async () => {
    const { body, status } = await requestUsers([{ email: "array@example.com" }]);

    assert.equal(status, 422);
    assert.deepEqual(body.details, ["Request body must be a JSON object."]);
  });

  it("requires a valid email address", async () => {
    const { body, status } = await requestUsers({
      email: "not-an-email",
      name: "Bad Email"
    });

    assert.equal(status, 422);
    assert.deepEqual(body.details, ["A valid email is required."]);
  });

  it("rejects non-string optional names", async () => {
    const { body, status } = await requestUsers({
      email: "name-type@example.com",
      name: 42
    });

    assert.equal(status, 422);
    assert.deepEqual(body.details, ["Name must be a string when provided."]);
  });
});
