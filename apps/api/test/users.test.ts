import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { Server } from "node:http";

import express from "express";

import usersRouter from "../src/routes/users";

const emptyBodyMessage = "User creation requires a non-empty JSON body.";

let server: Server | undefined;
let baseUrl = "";

before(async () => {
  const app = express();

  app.use(express.json());
  app.use("/users", usersRouter);

  server = app.listen(0);

  await new Promise<void>((resolve, reject) => {
    if (!server) {
      reject(new Error("Test server was not created."));
      return;
    }

    server.once("listening", () => resolve());
    server.once("error", reject);
  });

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Test server did not expose a numeric port.");
  }

  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    server?.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

async function postUsers(body?: string) {
  const response = await fetch(`${baseUrl}/users`, {
    body,
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    method: "POST"
  });

  return {
    body: await response.json(),
    response
  };
}

test("returns 400 when /users receives an empty JSON object", async () => {
  const { body, response } = await postUsers("{}");

  assert.equal(response.status, 400);
  assert.deepEqual(body, {
    data: null,
    message: emptyBodyMessage
  });
});

test("returns 400 when /users receives no body", async () => {
  const { body, response } = await postUsers();

  assert.equal(response.status, 400);
  assert.deepEqual(body, {
    data: null,
    message: emptyBodyMessage
  });
});

test("preserves the stub response for a populated JSON body", async () => {
  const { body, response } = await postUsers(
    JSON.stringify({
      email: "alice@example.com",
      name: "Alice"
    })
  );

  assert.equal(response.status, 201);
  assert.deepEqual(body, {
    data: {
      email: "alice@example.com",
      id: "stub-user-id",
      name: "Alice"
    },
    message: "User creation is not implemented yet."
  });
});
