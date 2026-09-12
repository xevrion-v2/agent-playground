import test from "node:test";
import assert from "node:assert";
import http from "node:http";
import app from "../app";

function startServer() {
  const server = http.createServer(app);
  return new Promise<{ url: string; close: () => void }>((resolve) => {
    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === "object" && address !== null ? address.port : 0;
      const url = `http://localhost:${port}`;
      resolve({
        url,
        close: () => server.close()
      });
    });
  });
}

test("POST /users payload validation and normalization", async (t) => {
  const { url, close } = await startServer();

  await t.test("should reject non-object JSON bodies", async () => {
    let res = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    });
    assert.strictEqual(res.status, 400);
    let body = await res.json();
    assert.strictEqual(body.error, "Request body must be a JSON object.");

    res = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(null)
    });
    assert.strictEqual(res.status, 400);
    body = await res.json();
    assert.strictEqual(body.error, "Request body must be a JSON object.");

    res = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("hello")
    });
    assert.strictEqual(res.status, 400);
    body = await res.json();
    assert.strictEqual(body.error, "Request body must be a JSON object.");
  });

  await t.test("should require a valid email", async () => {
    let res = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alice" })
    });
    assert.strictEqual(res.status, 400);
    let body = await res.json();
    assert.strictEqual(body.error, "Email is required.");

    res = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid-email" })
    });
    assert.strictEqual(res.status, 400);
    body = await res.json();
    assert.strictEqual(body.error, "Invalid email format.");
  });

  await t.test("should normalize email/name values and generate server-side id", async () => {
    const res = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "  Test.Email@Domain.Com  ",
        name: "   John Doe   "
      })
    });
    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.strictEqual(body.message, "User created successfully.");
    assert.strictEqual(body.data.email, "test.email@domain.com");
    assert.strictEqual(body.data.name, "John Doe");
    assert.ok(body.data.id);
    assert.notStrictEqual(body.data.id, "stub-user-id");
  });

  await t.test("should ignore client-controlled id and unrelated fields", async () => {
    const res = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "client-provided-id",
        email: "alice@example.com",
        someUnrelatedField: "hack"
      })
    });
    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.notStrictEqual(body.data.id, "client-provided-id");
    assert.strictEqual(body.data.someUnrelatedField, undefined);
  });

  close();
});
