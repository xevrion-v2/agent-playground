import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";

import { createApp } from "./app";

test("unknown routes return JSON 404 responses", async () => {
  const response = await request(createApp()).get("/missing-route");

  assert.equal(response.status, 404);
  assert.equal(response.headers["content-type"]?.includes("application/json"), true);
  assert.deepEqual(response.body, { error: "Not found" });
});

test("health route remains unchanged", async () => {
  const response = await request(createApp()).get("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok", service: "taskflow-api" });
});
