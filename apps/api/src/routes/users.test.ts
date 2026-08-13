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
  const arrayBody = await request(createApp()).post("/users").send([]);
  assert.equal(arrayBody.status, 400);

  const stringBody = await request(createApp()).post("/users").send("not-json-object");
  assert.equal(stringBody.status, 400);
});

test("POST /users requires a valid email", async () => {
  const missing = await request(createApp()).post("/users").send({});
  assert.equal(missing.status, 400);

  const invalid = await request(createApp()).post("/users").send({ email: "not-an-email" });
  assert.equal(invalid.status, 400);
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

test("POST /users rejects non-string name values", async () => {
  const response = await request(createApp())
    .post("/users")
    .send({ email: "ada@example.com", name: 42 });

  assert.equal(response.status, 400);
});

test("GET /users listing remains unchanged", async () => {
  const response = await request(createApp()).get("/users");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body.data, []);
});
