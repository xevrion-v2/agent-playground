import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, it } from "node:test";
import express from "express";

import usersRouter, { createUserFromPayload } from "./users";

async function withServer(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

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

  const body = response.headers.get("content-type")?.includes("application/json")
    ? await response.json()
    : await response.text();

  return {
    status: response.status,
    body
  };
}

describe("createUserFromPayload", () => {
  it("rejects non-object JSON bodies", () => {
    for (const payload of [null, [], "user@example.com", 42, true]) {
      const result = createUserFromPayload(payload);

      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.match(result.error, /JSON object/);
      }
    }
  });

  it("requires a valid normalized email", () => {
    for (const payload of [
      {},
      { email: "" },
      { email: "not-an-email" },
      { email: "missing-domain@" },
      { email: 123 }
    ]) {
      const result = createUserFromPayload(payload);

      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.error, "A valid email is required.");
      }
    }
  });

  it("normalizes trusted fields and ignores client-controlled fields", () => {
    const result = createUserFromPayload(
      {
        id: "client-id",
        email: "  ADA@Example.COM  ",
        name: " Ada   Lovelace ",
        role: "admin",
        metadata: { elevated: true }
      },
      () => "server-id"
    );

    assert.deepEqual(result, {
      ok: true,
      user: {
        id: "server-id",
        email: "ada@example.com",
        name: "Ada Lovelace"
      }
    });
  });

  it("omits blank optional names and rejects invalid name shapes", () => {
    assert.deepEqual(
      createUserFromPayload({ email: "person@example.com", name: "   " }, () => "id-1"),
      {
        ok: true,
        user: {
          id: "id-1",
          email: "person@example.com"
        }
      }
    );

    for (const name of [null, 123, ["Ada"]]) {
      const result = createUserFromPayload({ email: "person@example.com", name });

      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.error, "Name must be a string when provided.");
      }
    }
  });
});

describe("POST /users", () => {
  it("rejects array request bodies at the route boundary", async () => {
    await withServer(async (baseUrl) => {
      const response = await postUser(baseUrl, [{ email: "person@example.com" }]);

      assert.equal(response.status, 400);
      assert.deepEqual(response.body, {
        error: "Request body must be a JSON object."
      });
    });
  });

  it("creates users from normalized trusted fields only", async () => {
    await withServer(async (baseUrl) => {
      const response = await postUser(baseUrl, {
        id: "client-id",
        email: "  USER@Example.COM  ",
        name: " User   Name ",
        isAdmin: true
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
          id: "server-id"
        },
        {
          id: "server-id",
          email: "user@example.com",
          name: "User Name"
        }
      );
    });
  });
});
