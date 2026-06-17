import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import express, { type Express } from "express";

import { createApp, registerErrorHandlers } from "./app";

type JsonResponse = {
  statusCode: number;
  body: unknown;
};

async function requestJson(app: Express, path: string): Promise<JsonResponse> {
  const server = http.createServer(app);

  await new Promise<void>((resolve) => server.listen(0, resolve));

  const address = server.address();
  assert.notEqual(address, null);
  assert.notEqual(typeof address, "string");

  const port = typeof address === "object" && address ? address.port : 0;

  try {
    return await new Promise<JsonResponse>((resolve, reject) => {
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
            const raw = Buffer.concat(chunks).toString("utf8");
            resolve({
              statusCode: res.statusCode ?? 0,
              body: raw ? JSON.parse(raw) : null
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

test("unknown API routes return a JSON 404 response", async () => {
  const response = await requestJson(createApp(), "/missing-route");

  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.body, { error: "Route not found" });
});

test("global error middleware returns a JSON 500 response", async () => {
  const app = express();
  const originalConsoleError = console.error;

  app.get("/boom", () => {
    throw new Error("boom");
  });

  registerErrorHandlers(app);
  console.error = () => {};

  try {
    const response = await requestJson(app, "/boom");

    assert.equal(response.statusCode, 500);
    assert.deepEqual(response.body, { error: "Internal server error" });
  } finally {
    console.error = originalConsoleError;
  }
});
