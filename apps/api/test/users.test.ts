import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { AddressInfo } from "node:net";

import { app } from "../src/index.ts";

let baseUrl = "";
let server: ReturnType<typeof app.listen> | null = null;

function getBaseUrl() {
  return baseUrl;
}

function getServerAddress() {
  const address = server?.address();

  if (!address || typeof address === "string") {
    throw new Error("Test server did not start on an IP port.");
  }

  return address as AddressInfo;
}

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`${getBaseUrl()}${path}`, init);
  const body = await response.json();

  return { response, body };
}

before(async () => {
  server = app.listen(0);

  await new Promise<void>((resolve, reject) => {
    server?.once("listening", resolve);
    server?.once("error", reject);
  });

  const address = getServerAddress();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    server?.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

test("GET /users preserves the stub list response", async () => {
  const { response, body } = await request("/users");

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST /users rejects non-object JSON bodies", async () => {
  const { response, body } = await request("/users", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(["not", "an", "object"])
  });

  assert.equal(response.status, 400);
  assert.deepEqual(body, {
    error: "Validation failed",
    details: {
      body: ["Request body must be a JSON object."]
    }
  });
});

test("POST /users rejects invalid email addresses", async () => {
  const { response, body } = await request("/users", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      email: "not-an-email",
      name: "Ada"
    })
  });

  assert.equal(response.status, 400);
  assert.deepEqual(body, {
    error: "Validation failed",
    details: {
      email: ["A valid email address is required."]
    }
  });
});

test("POST /users normalizes email and name while ignoring client-controlled fields", async () => {
  const { response, body } = await request("/users", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      id: "client-id",
      email: "  Ada@Example.COM  ",
      name: "  Ada Lovelace  ",
      role: "admin"
    })
  });

  assert.equal(response.status, 201);
  assert.equal(body.message, "User created");
  assert.equal(body.data.email, "ada@example.com");
  assert.equal(body.data.name, "Ada Lovelace");
  assert.notEqual(body.data.id, "client-id");
  assert.match(body.data.id, /^[0-9a-f-]{36}$/i);
  assert.deepEqual(body.data, {
    id: body.data.id,
    email: "ada@example.com",
    name: "Ada Lovelace"
  });
});
