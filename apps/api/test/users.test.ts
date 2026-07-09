import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import { createServer } from "node:http";

import app from "../src/app";

let server: ReturnType<typeof createServer>;
let baseUrl: string;

before(async () => {
  server = createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (address && typeof address === "object") {
        baseUrl = `http://127.0.0.1:${address.port}`;
      }

      resolve();
    });
  });
});

after(async () => {
  await new Promise<void>((resolve) => {
    server.close(() => resolve());
  });
});

test("GET /users returns the stub list payload", async () => {
  const response = await fetch(`${baseUrl}/users`);
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(payload, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST /users returns the stub created user payload", async () => {
  const body = {
    name: "Lourdes",
    role: "creator"
  };

  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json();

  assert.equal(response.status, 201);
  assert.deepEqual(payload, {
    data: {
      id: "stub-user-id",
      name: "Lourdes",
      role: "creator"
    },
    message: "User creation is not implemented yet."
  });
});
