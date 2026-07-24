import assert from "node:assert/strict";
import test from "node:test";
import express from "express";

import usersRouter from "../routes/users";

async function withServer(fn: (baseUrl: string) => Promise<void>) {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  const server = app.listen(0);

  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });

  try {
    const address = server.address();
    assert(address && typeof address === "object");
    await fn(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function postJson(body: unknown) {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

test("POST /users rejects non-object JSON bodies", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, postJson(["not", "an", "object"]));
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error, "User payload must be a JSON object.");
  });
});

test("POST /users requires a valid email", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, postJson({ name: "Ava" }));
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error, "A valid email is required.");
  });
});

test("POST /users ignores client-controlled ids and extra fields", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(
      `${baseUrl}/users`,
      postJson({
        id: "admin",
        email: "ALANA@example.COM",
        name: " Alana ",
        role: "owner"
      })
    );
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.equal(payload.data.email, "alana@example.com");
    assert.equal(payload.data.name, "Alana");
    assert.notEqual(payload.data.id, "admin");
    assert.equal("role" in payload.data, false);
  });
});

test("POST /users rejects empty display names", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(
      `${baseUrl}/users`,
      postJson({
        email: "alana@example.com",
        name: "   "
      })
    );
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error, "Name must be a non-empty string when provided.");
  });
});
