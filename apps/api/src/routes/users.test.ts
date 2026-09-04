import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";

import usersRouter from "./users";

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

test("GET /users returns the current empty list placeholder", async () => {
  const response = await request(createTestApp()).get("/users");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    data: [],
    message: "User listing is not implemented yet.",
  });
});

test("POST /users returns the stub id with submitted fields", async () => {
  const payload = {
    name: "Ada Lovelace",
    email: "ada@example.com",
  };

  const response = await request(createTestApp()).post("/users").send(payload);

  assert.equal(response.status, 201);
  assert.deepEqual(response.body, {
    data: {
      id: "stub-user-id",
      ...payload,
    },
    message: "User creation is not implemented yet.",
  });
});
