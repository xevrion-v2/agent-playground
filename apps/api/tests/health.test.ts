import assert from "node:assert/strict";
import test from "node:test";

import app from "../src/app";

test("GET /health is not cacheable and keeps its response shape", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    assert.ok(address && typeof address === "object");

    const response = await fetch(`http://127.0.0.1:${address.port}/health`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), {
      status: "ok",
      service: "taskflow-api",
    });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
});
