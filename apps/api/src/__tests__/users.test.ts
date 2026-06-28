import { describe, it } from "node:test";
import assert from "node:assert/strict";

async function createApp() {
  const { default: router } = await import("../routes/users.js");
  const express = await import("express");
  const app = express();
  app.use(express.json());
  app.use("/users", router);
  return app;
}

describe("User routes", () => {
  it("GET /users returns empty list with message", async () => {
    const app = await createApp();
    const res = await fetch("http://localhost:9999/users");
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual(body.data, []);
    assert.ok(body.message.includes("not implemented"));
  });

  it("POST /users returns created stub with body data", async () => {
    const app = await createApp();
    const res = await fetch("http://localhost:9999/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "test", email: "test@example.com" })
    });
    const body = await res.json();
    assert.equal(res.status, 201);
    assert.equal(body.data.name, "test");
    assert.equal(body.data.email, "test@example.com");
  });
});
