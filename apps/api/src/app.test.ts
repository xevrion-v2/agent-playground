import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";

import createApp from "./app.js";

test("createApp can be imported without binding a port", () => {
  const app = createApp();
  assert.ok(app);
});

test("unknown routes return JSON 404", async () => {
  const response = await request(createApp()).get("/missing-route");
  assert.equal(response.status, 404);
  assert.equal(response.headers["content-type"]?.includes("json"), true);
  assert.equal(response.body.error, "Route not found");
});
