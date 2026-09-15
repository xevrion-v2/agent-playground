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

async function postUser(baseUrl: string, body: unknown) {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return {
    response,
    body: await response.json()
  };
}

describe("POST /users", () => {
  it("rejects non-object JSON bodies", async () => {
    await withApi(async (baseUrl) => {
      for (const payload of [null, [], "hello"]) {
        const { response, body } = await postUser(baseUrl, payload);

        assert.equal(response.status, 400);
        assert.deepEqual(body, {
          error: "Request body must be a JSON object."
        });
      }
    });
  });

  it("requires a valid email", async () => {
    await withApi(async (baseUrl) => {
      for (const payload of [{}, { email: "" }, { email: "not-an-email" }, { email: 123 }]) {
        const { response, body } = await postUser(baseUrl, payload);

        assert.equal(response.status, 400);
        assert.deepEqual(body, {
          error: "A valid email is required."
        });
      }
    });
  });

  it("normalizes email and optional name values", async () => {
    await withApi(async (baseUrl) => {
      const { response, body } = await postUser(baseUrl, {
        email: "  USER@Example.COM ",
        name: "  Ada   Lovelace  "
      });

      assert.equal(response.status, 201);
      assert.equal(body.data.email, "user@example.com");
      assert.equal(body.data.name, "Ada Lovelace");
      assert.match(body.data.id, /^[0-9a-f-]{36}$/);
    });
  });

  it("ignores client-controlled ids and unrelated fields", async () => {
    await withApi(async (baseUrl) => {
      const { response, body } = await postUser(baseUrl, {
        id: "client-id",
        email: "person@example.com",
        role: "admin",
        createdAt: "yesterday"
      });

      assert.equal(response.status, 201);
      assert.notEqual(body.data.id, "client-id");
      assert.deepEqual(Object.keys(body.data).sort(), ["email", "id"]);
      assert.equal(body.data.email, "person@example.com");
    });
  });
});
