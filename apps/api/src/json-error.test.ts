import assert from "node:assert/strict";
import { test } from "node:test";

import { app } from "./index";

test("malformed JSON request bodies return a JSON 400 response", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    assert(address && typeof address === "object");

    const response = await fetch(`http://127.0.0.1:${address.port}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: "{\"name\":"
    });

    assert.equal(response.status, 400);
    assert.equal(response.headers.get("content-type")?.includes("application/json"), true);
    assert.deepEqual(await response.json(), {
      error: "Invalid JSON request body"
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
