import assert from "node:assert/strict";
import { createServer } from "node:http";
import { AddressInfo } from "node:net";
import { after, before, test } from "node:test";

import express from "express";

import usersRouter from "../src/routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

const server = createServer(app);
let baseUrl = "";

before(async () => {
  await new Promise<void>((resolve) => {
    server.listen(0, () => {
      const address = server.address() as AddressInfo;
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.closeAllConnections();
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
});

test("GET /users returns the list stub response", async () => {
  const response = await fetch(`${baseUrl}/users`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST /users returns the create stub response", async () => {
  const payload = {
    name: "Ada Lovelace",
    email: "ada@example.com"
  };

  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const body = await response.json();

  assert.equal(response.status, 201);
  assert.deepEqual(body, {
    data: {
      id: "stub-user-id",
      ...payload
    },
    message: "User creation is not implemented yet."
  });
});
