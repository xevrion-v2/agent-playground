import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { createApp } from "../src/app.js";

test("POST /users rejects array bodies", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send([1, 2, 3]);
  assert.equal(res.status, 400);
  assert.equal(res.body.status, "error");
  assert.match(res.body.message, /object/i);
});

test("POST /users rejects null body", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send(null);
  assert.equal(res.status, 400);
  assert.equal(res.body.status, "error");
});

test("POST /users rejects missing email", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send({ name: "Ada" });
  assert.equal(res.status, 400);
  assert.match(res.body.message, /email/i);
});

test("POST /users rejects malformed email", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send({ email: "not-an-email" });
  assert.equal(res.status, 400);
  assert.match(res.body.message, /email/i);
});

test("POST /users generates id server-side and ignores client id", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send({ email: "ada@example.com", id: "client-supplied-id" });
  assert.equal(res.status, 201);
  assert.notEqual(res.body.data.id, "client-supplied-id");
  assert.match(res.body.data.id, /^usr_/);
  assert.equal(res.body.data.email, "ada@example.com");
});

test("POST /users normalizes email casing and whitespace", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send({ email: "  Mixed@Case.example  " });
  assert.equal(res.status, 201);
  assert.equal(res.body.data.email, "mixed@case.example");
});

test("POST /users accepts an optional name", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send({ email: "ada@example.com", name: "  Ada Lovelace " });
  assert.equal(res.status, 201);
  assert.equal(res.body.data.name, "Ada Lovelace");
});

test("POST /users ignores unrelated fields", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send({ email: "ada@example.com", isAdmin: true, password: "nope" });
  assert.equal(res.status, 201);
  assert.equal("isAdmin" in res.body.data, false);
  assert.equal("password" in res.body.data, false);
});

test("POST /users rejects empty-string name when provided", async () => {
  const app = createApp();
  const res = await request(app)
    .post("/users")
    .send({ email: "ada@example.com", name: "   " });
  assert.equal(res.status, 400);
  assert.match(res.body.message, /name/i);
});
