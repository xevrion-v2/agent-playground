import assert from "node:assert/strict";
import type { Server } from "node:http";
import { after, before, describe, it } from "node:test";

import express from "express";

import usersRouter from "./users";

const app = express();
let baseUrl: string;
let server: Server;

app.use(express.json());
app.use("/users", usersRouter);

before(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Expected the test server to listen on a TCP port.");
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
    headers: { "content-type": "application/json" },
    method: "POST"
  });

  return {
    body: await response.json(),
    status: response.status
  };
}

describe("POST /users", () => {
  it("rejects non-object bodies", async () => {
    const response = await postUser(["user@example.com"]);

    assert.equal(response.status, 400);
    assert.match(response.body.error, /json object/i);
  });

  it("rejects invalid email values", async () => {
    const response = await postUser({ email: "not-an-email", name: "Ada" });

    assert.equal(response.status, 400);
    assert.match(response.body.error, /email/i);
  });

  it("rejects client-controlled ids and extra fields", async () => {
    const response = await postUser({
      email: "user@example.com",
      id: "client-selected-id",
      role: "admin"
    });

    assert.equal(response.status, 400);
    assert.match(response.body.error, /unknown field/i);
  });

  it("creates users with a server-generated id and sanitized allowed fields", async () => {
    const response = await postUser({
      email: " Ada@example.COM ",
      name: " Ada Lovelace "
    });

    assert.equal(response.status, 201);
    assert.match(response.body.data.id, /^[0-9a-f-]{36}$/i);
    assert.equal(response.body.data.email, "ada@example.com");
    assert.equal(response.body.data.name, "Ada Lovelace");
  });
});
