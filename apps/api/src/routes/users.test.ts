import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, it } from "node:test";

import app from "../app";
import { createUserFromPayload } from "./users";

async function withApiServer(
  run: (baseUrl: string) => Promise<void>
): Promise<void> {
  const server = createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    await run(baseUrl);
  } finally {
    await closeServer(server);
  }
}

async function closeServer(server: Server): Promise<void> {
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

async function postUser(baseUrl: string, payload: unknown) {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return {
    status: response.status,
    body: await response.json()
  };
}

describe("createUserFromPayload", () => {
  it("rejects non-object JSON bodies", () => {
    for (const payload of [null, [], "hello", 42, true]) {
      const result = createUserFromPayload(payload);

      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.match(result.message, /JSON object/);
      }
    }
  });

  it("requires a valid normalized email", () => {
    for (const payload of [
      {},
      { email: "" },
      { email: "missing-at.example" },
      { email: "person@" },
      { email: 123 }
    ]) {
      const result = createUserFromPayload(payload);

      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.message, "A valid email is required.");
      }
    }
  });

  it("normalizes email and optional name fields", () => {
    const result = createUserFromPayload(
      {
        email: "  PERSON@Example.COM  ",
        name: "  Ada   Lovelace ",
        firstName: " Ada ",
        lastName: " Lovelace  "
      },
      () => "generated-id"
    );

    assert.deepEqual(result, {
      ok: true,
      user: {
        id: "generated-id",
        email: "person@example.com",
        name: "Ada Lovelace",
        firstName: "Ada",
        lastName: "Lovelace"
      }
    });
  });

  it("ignores client-controlled id and unrelated fields", () => {
    const result = createUserFromPayload(
      {
        id: "client-id",
        email: "user@example.com",
        role: "admin",
        extra: { nested: true }
      },
      () => "server-id"
    );

    assert.deepEqual(result, {
      ok: true,
      user: {
        id: "server-id",
        email: "user@example.com"
      }
    });
  });

  it("rejects non-string name fields", () => {
    const result = createUserFromPayload({
      email: "user@example.com",
      name: ["Ada"]
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.message, "name must be a string when provided.");
    }
  });
});

describe("POST /users", () => {
  it("rejects non-object request bodies", async () => {
    await withApiServer(async (baseUrl) => {
      for (const payload of [null, [], "hello", 42, true]) {
        const response = await postUser(baseUrl, payload);

        assert.equal(response.status, 400);
        assert.deepEqual(response.body, {
          error: "Request body must be a JSON object."
        });
      }
    });
  });

  it("rejects invalid email through the route", async () => {
    await withApiServer(async (baseUrl) => {
      const response = await postUser(baseUrl, { email: "missing-at.example" });

      assert.equal(response.status, 400);
      assert.deepEqual(response.body, {
        error: "A valid email is required."
      });
    });
  });

  it("returns only normalized trusted fields from the route", async () => {
    await withApiServer(async (baseUrl) => {
      const response = await postUser(baseUrl, {
        id: "client-id",
        email: "  PERSON@Example.COM  ",
        name: " Ada   Lovelace ",
        firstName: " Ada ",
        lastName: " Lovelace ",
        role: "admin"
      });

      assert.equal(response.status, 201);
      assert.equal(response.body.message, "User creation is not implemented yet.");
      assert.match(
        response.body.data.id,
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      );
      assert.notEqual(response.body.data.id, "client-id");
      assert.deepEqual(
        {
          ...response.body.data,
          id: "server-generated-id"
        },
        {
          id: "server-generated-id",
          email: "person@example.com",
          name: "Ada Lovelace",
          firstName: "Ada",
          lastName: "Lovelace"
        }
      );
    });
  });

  it("rejects invalid optional name shapes through the route", async () => {
    await withApiServer(async (baseUrl) => {
      const response = await postUser(baseUrl, {
        email: "user@example.com",
        name: 123
      });

      assert.equal(response.status, 400);
      assert.deepEqual(response.body, {
        error: "name must be a string when provided."
      });
    });
  });
});
