import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";

import { createApp } from "./app";

test("health route returns status and data envelope", async () => {
  const response = await request(createApp()).get("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    status: "ok",
    data: { service: "taskflow-api" },
  });
});
