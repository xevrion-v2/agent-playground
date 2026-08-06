import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { after, before, describe, it } from "node:test";

import app from "../app";

let server: Server;
let baseUrl: string;

before(async () => {
  await new Promise<void>((resolve) => {
    server = createServer(app);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      assert.ok(address && typeof address === "object");
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

async function postUser(body: unknown): Promise<{ status: number; json: any }> {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });

  return {
    status: response.status,
    json: await response.json()
  };
}

describe("POST /users", () => {
  it("generates server ids, normalizes accepted fields, and ignores extra fields", async () => {
    const response = await postUser({
      id: "client-controlled-id",
      email: "  USER@Example.COM  ",
      name: "  Ada   Lovelace  ",
      firstName: "  Ada ",
      lastName: " Lovelace ",
      role: "admin"
    });

    assert.equal(response.status, 201);
    assert.match(response.json.data.id, /^[0-9a-f-]{36}$/i);
    assert.notEqual(response.json.data.id, "client-controlled-id");
    assert.deepEqual(response.json.data, {
      id: response.json.data.id,
      email: "user@example.com",
      name: "Ada Lovelace",
      firstName: "Ada",
      lastName: "Lovelace"
    });
  });

  it("rejects non-object JSON bodies", async () => {
    for (const body of [null, [], "user@example.com"]) {
      const response = await postUser(body);

      assert.equal(response.status, 400);
      assert.equal(response.json.error, "Request body must be a JSON object.");
    }
  });

  it("requires a valid email", async () => {
    for (const body of [{}, { email: "" }, { email: "missing-at.example.com" }]) {
      const response = await postUser(body);

      assert.equal(response.status, 400);
      assert.equal(response.json.error, "A valid email is required.");
    }
  });

  it("rejects non-string optional name values", async () => {
    const response = await postUser({ email: "user@example.com", name: 42 });

    assert.equal(response.status, 400);
    assert.equal(response.json.error, "name must be a string when provided.");
  });
});
