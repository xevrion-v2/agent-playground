import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import http from "node:http";
import { join } from "node:path";
import { test } from "node:test";
import express from "express";

const source = readFileSync(join(import.meta.dirname, "index.ts"), "utf8");

test("API disables ETag generation before middleware and routes are registered", () => {
  const disableEtag = source.indexOf('app.disable("etag");');
  const jsonParser = source.indexOf("app.use(express.json());");
  const healthRoute = source.indexOf('app.get("/health"');
  const usersRoute = source.indexOf('app.use("/users", usersRouter);');

  assert.notEqual(disableEtag, -1);
  assert.ok(disableEtag < jsonParser);
  assert.ok(disableEtag < healthRoute);
  assert.ok(disableEtag < usersRoute);
});

test("existing health and users responses remain registered", () => {
  assert.match(source, /res\.json\(\{ status: "ok", service: "taskflow-api" \}\)/);
  assert.match(source, /app\.use\("\/users", usersRouter\)/);
});

test("disabling ETags prevents validators on JSON API responses", async () => {
  const app = express();
  app.disable("etag");
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  const server = app.listen(0);

  try {
    const { port } = server.address() as { port: number };
    const response = await new Promise<http.IncomingMessage>((resolve, reject) => {
      http
        .get({ host: "127.0.0.1", path: "/health", port }, resolve)
        .on("error", reject);
    });

    response.resume();
    assert.equal(response.statusCode, 200);
    assert.equal(response.headers.etag, undefined);
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
});
