import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";

import express from "express";

import usersRouter from "./users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

async function withServer<T>(handler: (baseUrl: string) => Promise<T>) {
  const app = createApp();
  const server = app.listen(0);

  await once(server, "listening");

  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Expected a numeric port for the test server.");
  }

  try {
    return await handler(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

test("GET /users returns the stub list response", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      data: [],
      message: "User listing is not implemented yet."
    });
  });
});

test("POST /users returns the stub create response", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: "jane@example.com",
        name: "Jane Doe"
      })
    });

    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      data: {
        id: "stub-user-id",
        email: "jane@example.com",
        name: "Jane Doe"
      },
      message: "User creation is not implemented yet."
    });
  });
});
