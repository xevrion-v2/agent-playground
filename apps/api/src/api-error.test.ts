import assert from "node:assert/strict";
import { describe, it } from "node:test";

import app from "./app";

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

describe("API error helper", () => {
  it("returns a consistent error envelope from a route", async () => {
    await withApi(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(null)
      });

      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), {
        error: {
          code: "invalid_request_body",
          message: "Request body must be a JSON object."
        }
      });
    });
  });
});
