import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { AddressInfo } from "node:net";

import { app } from "../index";

async function postUsers(body: unknown) {
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const { port } = server.address() as AddressInfo;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body)
    });

    return {
      status: response.status,
      json: await response.json()
    };
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

describe("POST /users", () => {
  it("normalizes valid user creation payloads", async () => {
    const response = await postUsers({
      email: "  Person@Example.COM ",
      name: "  Ada   Lovelace  ",
      firstName: " Ada ",
      lastName: " Lovelace "
    });

    assert.equal(response.status, 201);
    assert.match(response.json.data.id, /^[0-9a-f-]{36}$/);
    assert.equal(response.json.data.email, "person@example.com");
    assert.equal(response.json.data.name, "Ada Lovelace");
    assert.equal(response.json.data.firstName, "Ada");
    assert.equal(response.json.data.lastName, "Lovelace");
  });

  it("ignores client-controlled ids and unrelated fields", async () => {
    const response = await postUsers({
      id: "client-id",
      email: "user@example.com",
      role: "admin",
      unrelated: true
    });

    assert.equal(response.status, 201);
    assert.notEqual(response.json.data.id, "client-id");
    assert.equal(response.json.data.email, "user@example.com");
    assert.equal(response.json.data.role, undefined);
    assert.equal(response.json.data.unrelated, undefined);
  });

  it("rejects non-object JSON bodies", async () => {
    const response = await postUsers(["user@example.com"]);

    assert.equal(response.status, 400);
    assert.equal(response.json.error, "Request body must be a JSON object.");
  });

  it("requires a valid email", async () => {
    const response = await postUsers({ email: "not-an-email" });

    assert.equal(response.status, 400);
    assert.equal(response.json.error, "A valid email is required.");
  });

  it("rejects malformed JSON bodies", async () => {
    const response = await postUsers("{not-json");

    assert.equal(response.status, 400);
    assert.equal(response.json.error, "Request body must be valid JSON.");
  });

  it("rejects invalid optional name shapes", async () => {
    const response = await postUsers({
      email: "user@example.com",
      name: 123
    });

    assert.equal(response.status, 400);
    assert.equal(response.json.error, "name must be a string when provided.");
  });
});
