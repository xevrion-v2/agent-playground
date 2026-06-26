import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import type { Server } from "node:http";

import app from "../index";

let server: Server;
let baseUrl: string;

const postUser = async (body: unknown) =>
  fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });

describe("POST /users", () => {
  before(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address();
        assert.notEqual(address, null);
        assert.notEqual(typeof address, "string");
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

  it("rejects non-object JSON bodies", async () => {
    const response = await postUser(["not", "an", "object"]);
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error, "Request body must be a JSON object.");
  });

  it("requires a valid email", async () => {
    const response = await postUser({ email: "not-an-email" });
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error, "A valid email is required.");
  });

  it("normalizes email and name values", async () => {
    const response = await postUser({
      email: "  User@Example.COM  ",
      name: "  Luis   Gonzalez  "
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.equal(payload.data.email, "user@example.com");
    assert.equal(payload.data.name, "Luis Gonzalez");
  });

  it("ignores client-controlled id and unrelated fields", async () => {
    const response = await postUser({
      id: "attacker-id",
      email: "owner@example.com",
      role: "admin"
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.notEqual(payload.data.id, "attacker-id");
    assert.equal(payload.data.role, undefined);
    assert.match(payload.data.id, /^[0-9a-f-]{36}$/);
  });
});
