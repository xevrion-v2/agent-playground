import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import express from "express";

import usersRouter from "./users";

function createUsersApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

test("GET /users returns empty data and placeholder message", async () => {
  const response = await request(createUsersApp()).get("/users");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body.data, []);
  assert.equal(response.body.message, "User listing is not implemented yet.");
});

test("POST /users returns 201 with stub user id and submitted fields", async () => {
  const payload = { email: "ada@example.com", name: "Ada" };
  const response = await request(createUsersApp()).post("/users").send(payload);

  assert.equal(response.status, 201);
  assert.equal(response.body.data.id, "stub-user-id");
  assert.equal(response.body.data.email, payload.email);
  assert.equal(response.body.data.name, payload.name);
  assert.equal(response.body.message, "User creation is not implemented yet.");
});
