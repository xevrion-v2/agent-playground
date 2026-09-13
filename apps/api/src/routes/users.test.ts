import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import express from "express";
import usersRouter from "./users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

let server: ReturnType<typeof app.listen>;
let baseUrl: string;

before(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const address = server.address();
      assert(address && typeof address === "object");
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

async function createUser(body: unknown) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
}

describe("POST /users", () => {
  it("rejects non-object JSON bodies", async () => {
    const response = await createUser(["person@example.com"]);

    assert.equal(response.status, 400);
  });

  it("requires a valid email", async () => {
    const response = await createUser({ email: "not-an-email" });

    assert.equal(response.status, 400);
  });

  it("normalizes email and name values", async () => {
    const response = await createUser({
      email: "  PERSON@Example.COM  ",
      name: "  Ada   Lovelace  "
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.data.email, "person@example.com");
    assert.equal(body.data.name, "Ada Lovelace");
  });

  it("ignores client-controlled id and unrelated fields", async () => {
    const response = await createUser({
      id: "client-id",
      email: "user@example.com",
      role: "admin"
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.notEqual(body.data.id, "client-id");
    assert.equal(body.data.email, "user@example.com");
    assert.equal(body.data.role, undefined);
  });
});
