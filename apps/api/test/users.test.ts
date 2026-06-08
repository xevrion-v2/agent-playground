import test from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";

import express from "express";

import usersRouter from "../src/routes/users.js";

type TestServer = {
  baseUrl: string;
  close: () => Promise<void>;
};

async function createTestServer(): Promise<TestServer> {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const server = await new Promise<Server>((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  const address = server.address();

  assert.ok(address && typeof address === "object");

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
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/users`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      data: [],
      message: "User listing is not implemented yet."
    });
  } finally {
    await server.close();
  }
});

test("POST /users returns the create stub response", async () => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "user@example.com",
        name: "Test User"
      })
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.deepEqual(body, {
      data: {
        id: "stub-user-id",
        email: "user@example.com",
        name: "Test User"
      },
      message: "User creation is not implemented yet."
    });
  } finally {
    await server.close();
  }
});

test("PATCH /users returns 405 with an Allow header", async () => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/users`, {
      method: "PATCH"
    });
    const body = await response.json();

    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "GET, POST");
    assert.deepEqual(body, {
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Method PATCH is not allowed for /users."
      }
    });
  } finally {
    await server.close();
  }
});

test("DELETE /users returns 405 with an Allow header", async () => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/users`, {
      method: "DELETE"
    });
    const body = await response.json();

    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "GET, POST");
    assert.deepEqual(body, {
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Method DELETE is not allowed for /users."
      }
    });
  } finally {
    await server.close();
  }
});
