import assert from "node:assert/strict";
import express from "express";

import usersRouter from "./users.js";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

const server = app.listen(0);
const address = server.address();

if (!address || typeof address === "string") {
  throw new Error("Expected test server to listen on a local TCP port");
}

const baseUrl = `http://127.0.0.1:${address.port}`;

try {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "malicious-id",
      name: "Ada Lovelace",
      email: "ada@example.com",
      admin: true
    })
  });

  assert.equal(response.status, 201);

  const body = await response.json();
  assert.deepEqual(body.data, {
    id: "stub-user-id",
    name: "Ada Lovelace",
    email: "ada@example.com"
  });
  assert.equal("admin" in body.data, false);

  console.log("users route payload filtering checks passed");
} finally {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
