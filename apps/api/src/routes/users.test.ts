import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import type { Server } from "node:http";

import app from "../app";

describe("users routes", () => {
  let server: Server;
  let baseUrl: string;

  before(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address();
        if (!address || typeof address === "string") {
          throw new Error("Test server did not bind to a TCP port.");
        }
        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  it("rejects client-controlled id fields", async () => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: "client-controlled-id",
        email: "ada@example.com",
        name: "Ada Lovelace"
      })
    });

    assert.equal(response.status, 400);
    const payload = await response.json();
    assert.match(payload.message, /Unsupported field/);
  });

  it("creates users with a server-generated id", async () => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: "grace@example.com",
        name: "Grace Hopper"
      })
    });

    assert.equal(response.status, 201);
    const payload = await response.json();
    assert.match(payload.data.id, /^[0-9a-f-]{36}$/);
    assert.equal(payload.data.email, "grace@example.com");
    assert.equal(payload.data.name, "Grace Hopper");
  });

  it("rejects fields outside the create user whitelist", async () => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: "admin@example.com",
        name: "Admin User",
        role: "admin"
      })
    });

    assert.equal(response.status, 400);
    const payload = await response.json();
    assert.match(payload.message, /Unsupported field\(s\): role/);
  });

  it("rejects non-object request bodies", async () => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(["not", "an", "object"])
    });

    assert.equal(response.status, 400);
    const payload = await response.json();
    assert.equal(payload.error, "Invalid user payload.");
  });
});
