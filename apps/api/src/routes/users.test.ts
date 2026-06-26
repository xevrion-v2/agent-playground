import assert from "node:assert/strict";
import http, { type Server } from "node:http";
import test from "node:test";

import express from "express";

import usersRouter from "./users";

type JsonResponse = {
  status: number;
  body: {
    data?: Record<string, unknown>;
    error?: {
      code: string;
      message: string;
    };
  };
};

async function withServer<T>(callback: (baseUrl: string) => Promise<T>): Promise<T> {
  const app = express();
  app.use(express.json({ strict: false }));
  app.use("/users", usersRouter);

  const server: Server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const address = server.address();
    assert(address && typeof address === "object");
    return await callback(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

async function postUser(payload: unknown): Promise<JsonResponse> {
  return withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    return {
      status: response.status,
      body: await response.json()
    };
  });
}

test("POST /users rejects non-object JSON bodies", async () => {
  for (const payload of [null, [], "user@example.com", 42]) {
    const response = await postUser(payload);

    assert.equal(response.status, 400);
    assert.equal(response.body.error?.code, "invalid_user_payload");
    assert.match(response.body.error?.message ?? "", /JSON object/);
  }
});

test("POST /users requires a valid email", async () => {
  for (const payload of [{}, { email: "" }, { email: "not-an-email" }]) {
    const response = await postUser(payload);

    assert.equal(response.status, 400);
    assert.equal(response.body.error?.code, "invalid_user_payload");
    assert.match(response.body.error?.message ?? "", /valid email/);
  }
});

test("POST /users rejects invalid optional name values", async () => {
  const response = await postUser({
    email: "user@example.com",
    name: 123
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error?.code, "invalid_user_payload");
  assert.match(response.body.error?.message ?? "", /Name must be a string/);
});

test("POST /users normalizes allowed fields and ignores client-controlled data", async () => {
  const response = await postUser({
    id: "client-id",
    email: "  USER@Example.COM  ",
    name: "  Ada Lovelace  ",
    role: "admin",
    permissions: ["*"]
  });

  assert.equal(response.status, 201);
  assert.match(String(response.body.data?.id), /^[0-9a-f-]{36}$/);
  assert.notEqual(response.body.data?.id, "client-id");
  assert.equal(response.body.data?.email, "user@example.com");
  assert.equal(response.body.data?.name, "Ada Lovelace");
  assert.deepEqual(Object.keys(response.body.data ?? {}).sort(), [
    "email",
    "id",
    "name"
  ]);
});

test("POST /users omits blank optional names after trimming", async () => {
  const response = await postUser({
    email: "user@example.com",
    name: "   "
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.data?.email, "user@example.com");
  assert.equal(response.body.data?.name, undefined);
  assert.deepEqual(Object.keys(response.body.data ?? {}).sort(), ["email", "id"]);
});
