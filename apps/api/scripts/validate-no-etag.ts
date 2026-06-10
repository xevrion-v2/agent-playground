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
    const healthResponse = await fetch(`http://127.0.0.1:${address.port}/health`);
    assert.equal(healthResponse.status, 200);
    assert.equal(healthResponse.headers.has("etag"), false);

    const usersResponse = await fetch(`http://127.0.0.1:${address.port}/users`);
    assert.equal(usersResponse.status, 200);
    assert.equal(usersResponse.headers.has("etag"), false);

    console.log("ETag validation passed.");
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
