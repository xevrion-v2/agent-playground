import assert from "node:assert/strict";
import { describe, it } from "node:test";

import app from "./app";

describe("GET /health", () => {
  it("returns the normalized status/data envelope", async () => {
    const server = app.listen(0);

    try {
      const address = server.address();
      assert(address && typeof address === "object");

      const response = await fetch(`http://127.0.0.1:${address.port}/health`);
      const body = await response.json();

      assert.equal(response.status, 200);
      assert.deepEqual(body, {
        status: "ok",
        data: {
          service: "taskflow-api"
        }
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
});
