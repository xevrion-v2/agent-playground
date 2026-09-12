import assert from "node:assert/strict";
import type { Server } from "node:http";
import { type AddressInfo } from "node:net";
import { after, before, describe, it } from "node:test";

import app from "../app";

let server: Server;
let baseUrl: string;

before(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => {
    server.once("listening", resolve);
  });

  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
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

const postUser = (body: unknown) =>
  fetch(`${baseUrl}/users`, {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    },
    method: "POST"
  });

describe("POST /users", () => {
  it("rejects non-object JSON bodies", async () => {
    const response = await postUser(["natchapol@example.com"]);
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(payload, {
      error: {
        code: "invalid_user_payload",
        message: "User payload must be a JSON object."
      }
    });
  });

  it("rejects missing, blank, and invalid email values", async () => {
    const missingEmailResponse = await postUser({ name: "Natchapol" });
    const blankEmailResponse = await postUser({ email: "   " });
    const invalidEmailResponse = await postUser({ email: "natchapol" });

    assert.equal(missingEmailResponse.status, 400);
    assert.deepEqual(await missingEmailResponse.json(), {
      error: {
        code: "invalid_user_payload",
        message: "User payload must include a valid email string."
      }
    });

    assert.equal(blankEmailResponse.status, 400);
    assert.deepEqual(await blankEmailResponse.json(), {
      error: {
        code: "invalid_user_payload",
        message: "User payload must include a valid email string."
      }
    });

    assert.equal(invalidEmailResponse.status, 400);
    assert.deepEqual(await invalidEmailResponse.json(), {
      error: {
        code: "invalid_user_payload",
        message: "User payload must include a valid email string."
      }
    });
  });

  it("normalizes accepted user payloads", async () => {
    const response = await postUser({
      email: "  NATCHAPOL@Example.COM ",
      id: "client-supplied-id",
      name: "  Natchapol Wu  ",
      role: "admin"
    });
    const payload = await response.json();

    assert.equal(response.status, 201);
    assert.deepEqual(payload, {
      data: {
        email: "natchapol@example.com",
        id: "stub-user-id",
        name: "Natchapol Wu"
      },
      message: "User creation is not implemented yet."
    });
  });
});
