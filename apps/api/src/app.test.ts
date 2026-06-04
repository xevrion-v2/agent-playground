import test from "node:test";
import assert from "node:assert";
import { Server } from "http";
import { app } from "./app";

test("User Routes", async (t) => {
  let server: Server;
  let port: number;

  t.before(() => {
    return new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address();
        if (address && typeof address === "object") {
          port = address.port;
        }
        resolve();
      });
    });
  });

  t.after(() => {
    return new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  await t.test("GET /users returns empty list", async () => {
    const res = await fetch(`http://localhost:${port}/users`);
    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.deepStrictEqual(body.data, []);
    assert.strictEqual(body.message, "User listing is not implemented yet.");
  });

  await t.test("POST /users creates a user stub", async () => {
    const res = await fetch(`http://localhost:${port}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: "test@example.com", name: "Test User" })
    });
    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.data.id, "stub-user-id");
    assert.strictEqual(body.data.email, "test@example.com");
    assert.strictEqual(body.data.name, "Test User");
    assert.strictEqual(body.message, "User creation is not implemented yet.");
  });
});
