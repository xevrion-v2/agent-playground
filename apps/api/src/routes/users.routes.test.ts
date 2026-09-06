import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";

import usersRouter from "./users.js";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

test("GET /users returns stub list payload", async () => {
  const response = await request(createApp()).get("/users");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body.data, []);
});

test("POST /users returns created stub user", async () => {
  const response = await request(createApp()).post("/users").send({ email: "a@example.com" });
  assert.equal(response.status, 201);
  assert.equal(response.body.data.email, "a@example.com");
});
