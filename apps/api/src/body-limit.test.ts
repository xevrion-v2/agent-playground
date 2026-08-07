import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import http, { type Server } from "node:http";

import { createApp } from "./app";

let server: Server;
let baseUrl: string;

before(async () => {
  server = http.createServer(createApp());
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  baseUrl = `http://127.0.0.1:${address.port}`;
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

describe("JSON request body limit", () => {
  it("accepts normal JSON request bodies", async () => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Ada Lovelace" })
    });

    assert.equal(response.status, 201);
  });

  it("rejects JSON request bodies over the configured limit", async () => {
    const oversizedPayload = {
      notes: "x".repeat(101 * 1024)
    };

    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(oversizedPayload)
    });

    assert.equal(response.status, 413);
    assert.deepEqual(await response.json(), {
      error: "Request body too large",
      limit: "100kb"
    });
  });
});
