import assert from "node:assert/strict";
import { once } from "node:events";
import type { AddressInfo } from "node:net";
import { test } from "node:test";
import express from "express";

import healthRouter from "./health";

test("health route returns a consistent JSON envelope over HTTP", async (t) => {
  const app = express();
  app.use("/health", healthRouter);
  const server = app.listen(0, "127.0.0.1");
  t.after(() => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  await once(server, "listening");
  const { port } = server.address() as AddressInfo;
  const url = `http://127.0.0.1:${port}/health`;

  const response = await fetch(url);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json\b/);
  assert.deepEqual(await response.json(), {
    status: "ok",
    data: { service: "taskflow-api" },
  });

  // Express health probes can also use HEAD; it must keep its bodyless response.
  const head = await fetch(url, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});
