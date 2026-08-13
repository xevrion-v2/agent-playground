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
  const response = await request(createApp()).post("/users").send(["not-an-object"]);
  assert.equal(response.status, 400);
  assert.equal(response.headers["content-type"]?.includes("application/json"), true);
});

test("POST /users rejects client-controlled id and extra fields", async () => {
  const response = await request(createApp())
    .post("/users")
    .send({ id: "client-id", email: "user@example.com", role: "admin" });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /Unknown fields are not allowed/);
});

test("POST /users requires a valid email", async () => {
  const response = await request(createApp()).post("/users").send({ email: "bad" });
  assert.equal(response.status, 400);
  assert.equal(response.body.error, "A valid email is required.");
});

test("POST /users generates server-side id and normalizes values", async () => {
  const response = await request(createApp())
    .post("/users")
    .send({ email: "  Ada@Example.com ", name: "  Ada   Lovelace  " });

  assert.equal(response.status, 201);
  assert.match(response.body.data.id, /^[0-9a-f-]{36}$/i);
  assert.equal(response.body.data.email, "ada@example.com");
  assert.equal(response.body.data.name, "Ada Lovelace");
});

test("POST /users rejects non-string name values", async () => {
  const response = await request(createApp())
    .post("/users")
    .send({ email: "ada@example.com", name: 42 });

  assert.equal(response.status, 400);
});
