import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import { Server } from "http";
import app from "../app";

describe("User Routes", () => {
  let server: Server;
  let baseUrl: string;

  // Start the server on a random port before running tests
  before(() => {
    return new Promise<void>((resolve) => {
      server = app.listen(0, "localhost", () => {
        const address = server.address();
        if (address && typeof address === "object") {
          baseUrl = `http://localhost:${address.port}`;
        }
        resolve();
      });
    });
  });

  // Close the server after tests complete to clean up the port
  after(() => {
    return new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  test("GET /users should return list stub message", async () => {
    const res = await fetch(`${baseUrl}/users`);
    assert.strictEqual(res.status, 200);
    
    const body = await res.json();
    assert.deepStrictEqual(body, {
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  test("POST /users should return created user stub message", async () => {
    const payload = { name: "Alice", email: "alice@example.com" };
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    assert.strictEqual(res.status, 201);
    
    const body = await res.json();
    assert.strictEqual(body.message, "User creation is not implemented yet.");
    assert.strictEqual(body.data.id, "stub-user-id");
    assert.strictEqual(body.data.name, "Alice");
    assert.strictEqual(body.data.email, "alice@example.com");
  });
});