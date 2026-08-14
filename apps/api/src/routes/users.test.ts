import { strict as assert } from "node:assert";
import http from "node:http";
import test from "node:test";

import { createApp } from "../app";

type JsonResponse = {
  status: number;
  body: unknown;
};

async function request(path: string, options: { method?: string; body?: unknown } = {}): Promise<JsonResponse> {
  const app = createApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, resolve);
  });

  const address = server.address();
  assert.ok(address && typeof address === "object");

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}${path}`, {
      method: options.method ?? "GET",
      headers: options.body === undefined ? undefined : { "content-type": "application/json" },
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    return {
      status: response.status,
      body: await response.json()
    };
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("GET /users returns the list stub", async () => {
  const response = await request("/users");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST /users returns the create stub with request body fields", async () => {
  const response = await request("/users", {
    method: "POST",
    body: {
      name: "Ada Lovelace",
      email: "ada@example.com"
    }
  });

  assert.equal(response.status, 201);
  assert.deepEqual(response.body, {
    data: {
      id: "stub-user-id",
      name: "Ada Lovelace",
      email: "ada@example.com"
    },
    message: "User creation is not implemented yet."
  });
});
