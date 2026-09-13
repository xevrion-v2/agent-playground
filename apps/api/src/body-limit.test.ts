import assert from "node:assert/strict";
import { describe, it } from "node:test";

import app, { jsonBodyLimit } from "./app";

async function withApi<T>(callback: (baseUrl: string) => Promise<T>): Promise<T> {
  const server = app.listen(0);

  try {
    const address = server.address();
    assert(address && typeof address === "object");
    return await callback(`http://127.0.0.1:${address.port}`);
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
}

describe("JSON body size limit", () => {
  it("documents the configured conservative limit", () => {
    assert.equal(jsonBodyLimit, "32kb");
  });

  it("accepts normal JSON request bodies", async () => {
    await withApi(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email: "small@example.com" })
      });

      assert.equal(response.status, 201);
    });
  });

  it("rejects oversized JSON request bodies", async () => {
    await withApi(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ payload: "x".repeat(33 * 1024) })
      });

      assert.equal(response.status, 413);
      assert.deepEqual(await response.json(), {
        error: "JSON request bodies must be 32kb or smaller."
      });
    });
  });
});
