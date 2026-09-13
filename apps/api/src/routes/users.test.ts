import assert from "node:assert";
import { describe, it } from "node:test";
import express from "express";
import usersRouter from "./users.js";

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

async function makeRequest(
  app: express.Express,
  method: string,
  path: string,
  body?: any,
  headers: Record<string, string> = {}
) {
  const server = app.listen(0);
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Server address is not available");
  }
  const port = address.port;
  try {
    const res = await fetch(`http://127.0.0.1:${port}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const status = res.status;
    const json = await res.json();
    return { status, json };
  } finally {
    server.close();
  }
}

describe("POST /users payload validation", () => {
  it("rejects non-object JSON bodies", async () => {
    const app = createTestApp();
    const arrayRes = await makeRequest(app, "POST", "/users", ["not-an-object"]);
    assert.strictEqual(arrayRes.status, 400);
    assert.match(arrayRes.json.error, /request body must be a JSON object/i);
  });

  it("requires a valid email address", async () => {
    const app = createTestApp();

    const missingEmailRes = await makeRequest(app, "POST", "/users", { name: "Alice" });
    assert.strictEqual(missingEmailRes.status, 400);
    assert.match(missingEmailRes.json.error, /valid email is required/i);

    const invalidEmailRes = await makeRequest(app, "POST", "/users", { email: "invalid-email" });
    assert.strictEqual(invalidEmailRes.status, 400);
    assert.match(invalidEmailRes.json.error, /valid email is required/i);
  });

  it("normalizes email and name values", async () => {
    const app = createTestApp();
    const res = await makeRequest(app, "POST", "/users", {
      email: "  ALICE@Example.COM  ",
      name: "   Alice Smith   ",
    });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.json.data.email, "alice@example.com");
    assert.strictEqual(res.json.data.name, "Alice Smith");
    assert.ok(res.json.data.id);
    assert.notStrictEqual(res.json.data.id, "stub-user-id");
  });

  it("ignores client-controlled id and extra fields while generating server-side id", async () => {
    const app = createTestApp();
    const res = await makeRequest(app, "POST", "/users", {
      id: "custom-client-id",
      email: "bob@example.com",
      role: "admin",
      isAdmin: true,
      extraField: "ignored",
    });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.json.data.email, "bob@example.com");
    assert.notStrictEqual(res.json.data.id, "custom-client-id");
    assert.strictEqual(res.json.data.role, undefined);
    assert.strictEqual(res.json.data.isAdmin, undefined);
    assert.strictEqual(res.json.data.extraField, undefined);
  });
});
