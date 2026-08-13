import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import test from "node:test";

import express from "express";

import usersRouter from "../src/routes/users";

type TestServer = {
  baseUrl: string;
  close: () => Promise<void>;
};

async function createUsersTestServer(): Promise<TestServer> {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const server: Server = createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address() as AddressInfo;

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
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

test("GET /users returns the list stub response", async () => {
  const server = await createUsersTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/users`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      data: [],
      message: "User listing is not implemented yet."
    });
  } finally {
    await server.close();
  }
});

test("POST /users returns the create stub response", async () => {
  const server = await createUsersTestServer();
  const payload = {
    email: "ada@example.com",
    name: "Ada Lovelace"
  };

  try {
    const response = await fetch(`${server.baseUrl}/users`, {
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });

    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      data: {
        id: "stub-user-id",
        ...payload
      },
      message: "User creation is not implemented yet."
    });
  } finally {
    await server.close();
  }
});
