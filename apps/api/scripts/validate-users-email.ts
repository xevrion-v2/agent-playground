import assert from "node:assert/strict";
import { createServer } from "node:http";

import app from "../src/index";

async function postJson(url: string, body: unknown) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

async function main() {
  const server = createServer(app);

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Unable to determine validation server address.");
  }

  const baseUrl = `http://127.0.0.1:${address.port}/users`;

  try {
    const invalidEmailResponse = await postJson(baseUrl, {
      name: "Taylor",
      email: "not-an-email"
    });
    const invalidEmailBody = await invalidEmailResponse.json();

    assert.equal(invalidEmailResponse.status, 400);
    assert.deepEqual(invalidEmailBody, { error: "Valid email is required" });

    const missingNameResponse = await postJson(baseUrl, {
      name: "   ",
      email: "taylor@example.com"
    });
    const missingNameBody = await missingNameResponse.json();

    assert.equal(missingNameResponse.status, 400);
    assert.deepEqual(missingNameBody, { error: "Name is required" });

    const validResponse = await postJson(baseUrl, {
      name: " Taylor ",
      email: "taylor@example.com"
    });
    const validBody = await validResponse.json();

    assert.equal(validResponse.status, 201);
    assert.deepEqual(validBody, {
      data: {
        id: "stub-user-id",
        name: "Taylor",
        email: "taylor@example.com"
      },
      message: "User creation is not implemented yet."
    });

    console.log("User email validation passed.");
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
