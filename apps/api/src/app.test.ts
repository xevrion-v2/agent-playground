import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import { createApp } from "./app";

async function getJson(path: string) {
  const server = http.createServer(createApp());

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

test("GET /health returns the standard status/data envelope", async () => {
  const response = await getJson("/health");

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    status: "ok",
    data: {
      service: "taskflow-api"
    }
  });
});
