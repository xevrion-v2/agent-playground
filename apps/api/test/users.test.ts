import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import app from "../src/app";

let server: ReturnType<typeof app.listen>;
let baseUrl = "";

before(async () => {
  server = app.listen(0);

  await new Promise<void>((resolve, reject) => {
    server.once("listening", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("Failed to determine test server port."));
        return;
      }

      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });

    server.once("error", reject);
  });
});

after(async () => {
  if (!server) {
    return;
  }

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

test("GET /users returns the empty placeholder list", async () => {
  const response = await fetch(`${baseUrl}/users`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST /users echoes the submitted payload with a stub id", async () => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: "Ada",
      email: "ada@example.com"
    })
  });

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    data: {
      id: "stub-user-id",
      name: "Ada",
      email: "ada@example.com"
    },
    message: "User creation is not implemented yet."
  });
});
