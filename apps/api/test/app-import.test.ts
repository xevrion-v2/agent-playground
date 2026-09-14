import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";

import app from "../src/app";

test("the Express app is import-safe and preserves existing routes", async () => {
  const server = createServer(app);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const address = server.address();
    assert.ok(address && typeof address === "object");
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const health = await fetch(`${baseUrl}/health`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), {
      status: "ok",
      service: "taskflow-api",
    });

    const users = await fetch(`${baseUrl}/users`);
    assert.equal(users.status, 200);
    assert.deepEqual(await users.json(), {
      data: [],
      message: "User listing is not implemented yet.",
    });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
