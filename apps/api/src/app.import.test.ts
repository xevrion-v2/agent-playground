import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import { app } from "./app";

async function requestJson(path: string) {
  const server = http.createServer(app);

  await new Promise<void>((resolve) => server.listen(0, resolve));

  const address = server.address();
  assert.notEqual(address, null);
  assert.notEqual(typeof address, "string");

  const port = typeof address === "object" && address ? address.port : 0;

  try {
    return await new Promise<{ statusCode: number; body: unknown }>((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path,
          method: "GET"
        },
        (res) => {
          const chunks: Buffer[] = [];

          res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          res.on("end", () => {
            resolve({
              statusCode: res.statusCode ?? 0,
              body: JSON.parse(Buffer.concat(chunks).toString("utf8"))
            });
          });
        }
      );

      req.on("error", reject);
      req.end();
    });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("app import does not start a listener", () => {
  const server = http.createServer(app);

  assert.equal(server.listening, false);
  assert.equal(server.address(), null);
});

test("imported app keeps existing health response", async () => {
  const response = await requestJson("/health");

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    status: "ok",
    service: "taskflow-api"
  });
});

test("imported app keeps existing user listing response", async () => {
  const response = await requestJson("/users");

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});
