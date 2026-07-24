import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import type { Server } from "node:http";

import app from "../app";

let server: Server;
let baseUrl: string;

before(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Expected server to listen on a local port.");
  }

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

async function postUser(body: unknown) {
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

describe("POST /users", () => {
  it("rejects non-object JSON bodies", async () => {
    const response = await postUser([]);

    assert.equal(response.status, 400);
    assert.deepEqual(response.body.errors, ["Request body must be a JSON object."]);
  });

  it("requires a valid email", async () => {
    const missingEmail = await postUser({ name: "Ada" });
    const invalidEmail = await postUser({ email: "not-an-email" });

    assert.equal(missingEmail.status, 400);
    assert.equal(invalidEmail.status, 400);
    assert.deepEqual(missingEmail.body.errors, ["email is required."]);
    assert.deepEqual(invalidEmail.body.errors, ["email must be valid."]);
  });

  it("normalizes email and name values", async () => {
    const response = await postUser({
      email: "  ADA@EXAMPLE.COM  ",
      name: "  Ada Lovelace  "
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.data.email, "ada@example.com");
    assert.equal(response.body.data.name, "Ada Lovelace");
  });

  it("ignores client-controlled ids and unrelated fields", async () => {
    const response = await postUser({
      email: "grace@example.com",
      id: "client-controlled-id",
      isAdmin: true,
      name: "Grace"
    });

    assert.equal(response.status, 201);
    assert.notEqual(response.body.data.id, "client-controlled-id");
    assert.equal(response.body.data.email, "grace@example.com");
    assert.equal(response.body.data.name, "Grace");
    assert.equal(response.body.data.isAdmin, undefined);
  });
});

