import test from "node:test";
import assert from "node:assert";
import { Server } from "http";
import app from "../app";

test("POST /users validation", async (t) => {
  let server: Server;
  let baseUrl: string;

  t.before(() => {
    return new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address();
        const port = typeof address === "object" && address !== null ? address.port : 0;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  t.after(() => {
    return new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  await t.test("rejects non-object JSON body", async () => {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([1, 2, 3]) // array instead of object
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.ok(data.error);
  });

  await t.test("requires email", async () => {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alice" })
    });
    assert.strictEqual(res.status, 400);
  });

  await t.test("rejects invalid email", async () => {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid-email", name: "Alice" })
    });
    assert.strictEqual(res.status, 400);
  });

  await t.test("normalizes email and name", async () => {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "  ALICE@example.com  ", name: "  Alice Smith  " })
    });
    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.strictEqual(body.data.email, "alice@example.com");
    assert.strictEqual(body.data.name, "Alice Smith");
  });

  await t.test("ignores client-controlled id and extra fields", async () => {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "bob@example.com",
        id: "malicious-id",
        extraField: "should-be-ignored"
      })
    });
    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.notStrictEqual(body.data.id, "malicious-id");
    assert.ok(body.data.id);
    assert.strictEqual(body.data.extraField, undefined);
  });
});
