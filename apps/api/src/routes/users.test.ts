import assert from "node:assert/strict";
import { describe, it } from "node:test";

import app from "../app";

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

describe("user routes", () => {
  it("lists the current empty user stub response", async () => {
    await withApi(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/users`);
      const body = await response.json();

      assert.equal(response.status, 200);
      assert.deepEqual(body, {
        data: [],
        message: "User listing is not implemented yet."
      });
    });
  });

  it("returns the current create user stub response", async () => {
    await withApi(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: "new.user@example.com",
          name: "New User"
        })
      });
      const body = await response.json();

      assert.equal(response.status, 201);
      assert.deepEqual(body, {
        data: {
          id: "stub-user-id",
          email: "new.user@example.com",
          name: "New User"
        },
        message: "User creation is not implemented yet."
      });
    });
  });
});
