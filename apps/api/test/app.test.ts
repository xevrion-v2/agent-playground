import test from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";

import app, { JSON_BODY_LIMIT } from "../src/app.js";

type TestServer = {
  baseUrl: string;
  close: () => Promise<void>;
};

async function createTestServer(): Promise<TestServer> {
  const server = await new Promise<Server>((resolve) => {
    const listener = app.listen(0, () => resolve(listener));
  });
  const address = server.address();

  assert.ok(address && typeof address === "object");

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      })
  };
}

test("GET /health returns the API health payload", async () => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      status: "ok",
      service: "taskflow-api"
    });
  } finally {
    await server.close();
  }
});

test("POST /users rejects JSON payloads above the configured body limit", async () => {
  const server = await createTestServer();
  const oversizedName = "x".repeat(110 * 1024);

  try {
    const response = await fetch(`${server.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "too-large@example.com",
        name: oversizedName
      })
    });

    assert.equal(JSON_BODY_LIMIT, "100kb");
    assert.equal(response.status, 413);
  } finally {
    await server.close();
  }
});
