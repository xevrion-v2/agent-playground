import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";

import usersRouter from "../routes/users.js";

function createApp() {
  const app = express();
  app.use(express.json({ limit: "100kb" }));
  app.use("/users", usersRouter);
  return app;
}

test("POST /users rejects oversized JSON payloads", async () => {
  const large = "x".repeat(200_000);
  const response = await request(createApp())
    .post("/users")
    .set("Content-Type", "application/json")
    .send(JSON.stringify({ email: "a@example.com", note: large }));

  assert.equal(response.status, 413);
});

test("POST /users accepts payloads under the configured limit", async () => {
  const response = await request(createApp()).post("/users").send({ email: "small@example.com" });
  assert.notEqual(response.status, 413);
});
