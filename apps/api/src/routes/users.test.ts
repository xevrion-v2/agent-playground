import assert from "node:assert/strict";
import test from "node:test";
import type { AddressInfo } from "node:net";

import express from "express";

import usersRouter from "./users.ts";

function startUsersApi() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;

  return {
    baseUrl: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      })
  };
}

test("GET /users returns the stubbed empty user list", async (t) => {
  const api = startUsersApi();
  t.after(api.close);

  const response = await fetch(`${api.baseUrl}/users`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST /users returns a created stub user with request fields", async (t) => {
  const api = startUsersApi();
  t.after(api.close);

  const response = await fetch(`${api.baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      email: "ada@example.com",
      name: "Ada Lovelace"
    })
  });
  const body = await response.json();

  assert.equal(response.status, 201);
  assert.deepEqual(body, {
    data: {
      id: "stub-user-id",
      email: "ada@example.com",
      name: "Ada Lovelace"
    },
    message: "User creation is not implemented yet."
  });
});
