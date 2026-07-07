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

async function postUser(baseUrl: string, body: unknown) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
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

test("POST /users normalizes accepted user payloads", async () => {
  await withServer(async (baseUrl) => {
    const response = await postUser(baseUrl, {
      id: "client-controlled-id",
      email: "  JANE@EXAMPLE.COM  ",
      name: "  Jane Doe  ",
      role: "admin"
    });

    assert.equal(response.status, 201);

    const body = await response.json();
    assert.match(body.data.id, /^[0-9a-f-]{36}$/i);
    assert.notEqual(body.data.id, "client-controlled-id");
    assert.deepEqual(body, {
      data: {
        id: body.data.id,
        email: "jane@example.com",
        name: "Jane Doe"
      },
      message: "User creation is not implemented yet."
    });
  });
});

test("POST /users omits blank optional names", async () => {
  await withServer(async (baseUrl) => {
    const response = await postUser(baseUrl, {
      email: "team@example.com",
      name: "   "
    });

    assert.equal(response.status, 201);

    const body = await response.json();
    assert.deepEqual(Object.keys(body.data).sort(), ["email", "id"]);
    assert.equal(body.data.email, "team@example.com");
  });
});

test("POST /users rejects non-object JSON bodies", async () => {
  await withServer(async (baseUrl) => {
    const response = await postUser(baseUrl, []);

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: {
        message: "Request body must be a JSON object."
      }
    });
  });
});

test("POST /users rejects invalid email values", async () => {
  await withServer(async (baseUrl) => {
    const missingEmail = await postUser(baseUrl, {
      name: "Jane Doe"
    });
    const invalidEmail = await postUser(baseUrl, {
      email: "not-an-email"
    });

    assert.equal(missingEmail.status, 400);
    assert.equal(invalidEmail.status, 400);
    assert.deepEqual(await missingEmail.json(), {
      error: {
        message: "A valid email is required."
      }
    });
    assert.deepEqual(await invalidEmail.json(), {
      error: {
        message: "A valid email is required."
      }
    });
  });
});

test("POST /users rejects non-string names", async () => {
  await withServer(async (baseUrl) => {
    const response = await postUser(baseUrl, {
      email: "jane@example.com",
      name: 42
    });

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: {
        message: "Name must be a string when provided."
      }
    });
  });
});
