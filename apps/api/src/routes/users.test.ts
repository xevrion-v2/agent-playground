import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import usersRouter from "./users";

function createTestServer() {
  const app = express();

  app.use(express.json());
  app.use("/users", usersRouter);

  const server = app.listen(0);

  return new Promise<{ baseUrl: string; close: () => Promise<void> }>((resolve, reject) => {
    server.once("error", reject);
    server.once("listening", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("Expected server to listen on a TCP port"));
        return;
      }

      resolve({
        baseUrl: `http://127.0.0.1:${address.port}`,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => (error ? closeReject(error) : closeResolve()));
          })
      });
    });
  });
}

test("GET /users returns the placeholder user list", async () => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/users`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(payload, {
      data: [],
      message: "User listing is not implemented yet."
    });
  } finally {
    await server.close();
  }
});

test("POST /users returns a created stub user", async () => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: "client@example.com",
        name: "TaskFlow Client"
      })
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.deepEqual(payload, {
      data: {
        id: "stub-user-id",
        email: "client@example.com",
        name: "TaskFlow Client"
      },
      message: "User creation is not implemented yet."
    });
  } finally {
    await server.close();
  }
});
