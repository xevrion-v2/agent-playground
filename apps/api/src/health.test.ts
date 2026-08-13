import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import { app } from "./index.js";

test("GET /health cache policy", async () => {
  const res = await request(app).get("/health");
  
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, "ok");
  assert.strictEqual(res.body.service, "taskflow-api");
  assert.strictEqual(res.headers["cache-control"], "no-store");
});
