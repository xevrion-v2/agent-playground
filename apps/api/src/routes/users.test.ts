import assert from "node:assert/strict";
import { test } from "node:test";
import express from "express";

import usersRouter from "./users";

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  app.use((
    error: unknown,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error instanceof SyntaxError) {
      return res.status(400).json({
        error: "Invalid JSON body."
      });
    }

    return next(error);
  });
  return app;
}

async function postUser(body: unknown) {
  const server = createTestApp().listen(0);

  try {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Could not bind test server");
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });

    const responseBody = response.headers.get("content-type")?.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      status: response.status,
      body: responseBody
    };
  }
  finally {
    await new Promise<void>((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve());
    });
  }
}

test("normalizes accepted user creation payloads and strips client-owned fields", async () => {
  const response = await postUser({
    id: "client-controlled",
    email: "  ADA@Example.COM  ",
    name: "  Ada    Lovelace  ",
    role: "admin"
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.email, "ada@example.com");
  assert.equal(response.body.data.name, "Ada Lovelace");
  assert.match(response.body.data.id, /^usr_\d+_[a-z0-9]+$/);
  assert.notEqual(response.body.data.id, "client-controlled");
  assert.deepEqual(Object.keys(response.body.data).sort(), ["email", "id", "name"]);
});

test("omits blank optional names after normalization", async () => {
  const response = await postUser({
    email: "person@example.com",
    name: "   "
  });

  assert.equal(response.status, 201);
  assert.deepEqual(Object.keys(response.body.data).sort(), ["email", "id"]);
});

test("rejects non-object JSON bodies", async () => {
  for (const body of [null, [], "user@example.com", 42]) {
    const response = await postUser(body);
    assert.equal(response.status, 400);
  }
});

test("requires a valid email", async () => {
  for (const body of [
    {},
    { email: "" },
    { email: "not-an-email" },
    { email: "missing-domain@" },
    { email: 123 }
  ]) {
    const response = await postUser(body);
    assert.equal(response.status, 400);
  }
});

test("rejects invalid optional name shapes", async () => {
  for (const name of [null, 123, ["Ada"]]) {
    const response = await postUser({
      email: "ada@example.com",
      name
    });
    assert.equal(response.status, 400);
  }
});
