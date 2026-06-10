import assert from "node:assert/strict";
import { createServer } from "node:http";

import app from "../src/index";

async function main() {
  const server = createServer(app);

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Unable to determine validation server address.");
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: '{"name":"Taylor","email":'
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/i);
    assert.deepEqual(body, { error: "Invalid JSON request body" });

    console.log("Malformed JSON validation passed.");
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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
