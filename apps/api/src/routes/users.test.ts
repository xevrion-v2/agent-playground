import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import type { Server } from "node:http";

import { createApp } from "../app";

let server: Server;
let baseUrl: string;

before(async () => {
  await new Promise<void>((resolve) => {
    server = createApp().listen(0, () => {
      const address = server.address();

      if (typeof address !== "object" || address === null) {
        throw new Error("Expected server to listen on an ephemeral port.");
      }

      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

async function postUser(body: unknown) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

describe("POST /users", () => {
  it("rejects non-object JSON bodies", async () => {
    for (const body of [null, [], "not-an-object"]) {
      const response = await postUser(body);
      const payload = await response.json();

      assert.equal(response.status, 400);
      assert.equal(payload.error.code, "invalid_body");
    }
  });

  it("requires a valid email address", async () => {
    for (const email of [undefined, "", "missing-at.example", "name@example"]) {
      const response = await postUser({ email });
      const payload = await response.json();

      assert.equal(response.status, 400);
      assert.equal(payload.error.code, "invalid_email");
    }
  });

  it("normalizes email and optional name values", async () => {
    const response = await postUser({
      email: "  OWNER@Example.COM ",
      name: "  Ada   Lovelace  "
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.match(payload.data.id, /^[0-9a-f-]{36}$/);
    assert.equal(payload.data.email, "owner@example.com");
    assert.equal(payload.data.name, "Ada Lovelace");
  });

  it("ignores client-controlled ids and unrelated fields", async () => {
    const response = await postUser({
      id: "attacker-controlled-id",
      email: "user@example.com",
      role: "admin",
      unrelated: true
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.notEqual(payload.data.id, "attacker-controlled-id");
    assert.equal(payload.data.email, "user@example.com");
    assert.equal("role" in payload.data, false);
    assert.equal("unrelated" in payload.data, false);
  });

  it("rejects invalid JSON", async () => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: "{"
    });
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error.code, "invalid_json");
  });
});
