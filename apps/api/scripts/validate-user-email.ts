import assert from "node:assert/strict";
import express from "express";

import usersRouter from "../src/routes/users";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);

const server = app.listen(0);

try {
  const address = server.address();

  if (address === null || typeof address === "string") {
    throw new Error("Expected an ephemeral TCP port for the validation server.");
  }

  const baseUrl = `http://127.0.0.1:${address.port}`;

  const invalidPayloads = [
    {},
    { name: "", email: "user@example.com" },
    { name: "Ada", email: "" },
    { name: "Ada", email: "not-an-email" },
    { name: "Ada", email: "ada@" },
    { name: "Ada", email: "@example.com" }
  ];

  for (const payload of invalidPayloads) {
    const response = await fetch(`${baseUrl}/users`, {
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
      method: "POST"
    });

    assert.equal(response.status, 400, `Expected 400 for ${JSON.stringify(payload)}`);
  }

  const response = await fetch(`${baseUrl}/users`, {
    body: JSON.stringify({
      email: " ada@example.com ",
      name: " Ada "
    }),
    headers: { "content-type": "application/json" },
    method: "POST"
  });

  assert.equal(response.status, 201);

  const body = await response.json();

  assert.deepEqual(body, {
    data: {
      email: "ada@example.com",
      id: "stub-user-id",
      name: "Ada"
    },
    message: "User creation is not implemented yet."
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
