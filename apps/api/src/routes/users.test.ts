import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";

import usersRouter from "./users.ts";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

test("POST /users rejects non-object JSON bodies", async () => {
  const response = await request(createApp()).post("/users").send("[]");
  assert.equal(response.status, 400);
});

test("POST /users requires a valid email", async () => {
  const response = await request(createApp()).post("/users").send({ email: "not-an-email" });
  assert.equal(response.status, 400);
});

test("POST /users normalizes email and optional name", async () => {
  const response = await request(createApp())
    .post("/users")
    .send({ email: "  Alice@Example.COM ", name: "  Alice   Example  ", id: "client-id" });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.email, "alice@example.com");
  assert.equal(response.body.data.name, "Alice Example");
  assert.notEqual(response.body.data.id, "client-id");
  assert.match(response.body.data.id, /^[0-9a-f-]{36}$/i);
});

test("POST /users ignores unrelated fields", async () => {
  const response = await request(createApp())
    .post("/users")
    .send({ email: "bob@example.com", role: "admin", isAdmin: true });

  assert.equal(response.status, 201);
  assert.deepEqual(Object.keys(response.body.data).sort(), ["email", "id"]);
});
