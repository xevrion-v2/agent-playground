import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import express from "express";

import usersRouter from "./routes/users.js";

test("POST /users rejects client-controlled id and extra fields", async () => {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const response = await request(app)
    .post("/users")
    .send({
      id: "client-id",
      email: "User@Example.com",
      name: "  Ada  Lovelace ",
      role: "admin",
    });

  assert.equal(response.status, 201);
  assert.notEqual(response.body.data.id, "client-id");
  assert.equal(response.body.data.email, "user@example.com");
  assert.equal(response.body.data.name, "Ada Lovelace");
  assert.equal(response.body.data.role, undefined);
});

test("POST /users rejects non-object bodies", async () => {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const response = await request(app)
    .post("/users")
    .send(["not-an-object"]);

  assert.equal(response.status, 400);
});
