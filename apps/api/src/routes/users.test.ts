import { createServer } from "node:http";
import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";

import app from "../app";

const server = createServer(app);
let baseUrl = "";

before(
  () =>
    new Promise<void>((resolve) => {
      server.listen(0, () => {
        const address = server.address();

        if (!address || typeof address === "string") {
          throw new Error("Expected server to listen on a TCP port.");
        }

        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    })
);

after(
  () =>
    new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    })
);

async function postUser(body: unknown) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

describe("POST /users", () => {
  it("rejects missing or invalid email values", async () => {
    for (const body of [
      { name: "Ada" },
      { name: "Ada", email: "" },
      { name: "Ada", email: "not-an-email" },
      { name: "Ada", email: "ada@" },
      { name: "Ada", email: "@example.com" }
    ]) {
      const response = await postUser(body);

      assert.equal(response.status, 400);
    }
  });

  it("rejects missing or empty names", async () => {
    for (const body of [
      { email: "ada@example.com" },
      { name: "", email: "ada@example.com" },
      { name: "   ", email: "ada@example.com" }
    ]) {
      const response = await postUser(body);

      assert.equal(response.status, 400);
    }
  });

  it("accepts valid name and email values", async () => {
    const response = await postUser({
      name: " Ada Lovelace ",
      email: " ada@example.com "
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.equal(payload.data.name, "Ada Lovelace");
    assert.equal(payload.data.email, "ada@example.com");
  });

  it("keeps the health endpoint unchanged", async () => {
    const response = await fetch(`${baseUrl}/health`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(payload, { status: "ok", service: "taskflow-api" });
  });
});
