import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import request from "supertest";

import { createApp } from "../src/app.js";

test("GET /health returns the standardized envelope", async () => {
  const app = createApp();
  const res = await request(app).get("/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
  assert.ok(typeof res.body.data === "object");
  assert.equal(res.body.data.service, "taskflow-api");
});

test("GET /health envelope shape does not leak extra top-level keys", async () => {
  const app = createApp();
  const res = await request(app).get("/health");
  assert.deepEqual(Object.keys(res.body).sort(), ["data", "status"]);
});

test("GET /health stays under the documented contract on repeated calls", async () => {
  const app = createApp();
  const a = await request(app).get("/health");
  const b = await request(app).get("/health");
  assert.equal(a.body.status, b.body.status);
  assert.equal(a.body.data.service, b.body.data.service);
});
