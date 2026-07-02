import assert from "node:assert/strict";
import test from "node:test";

import express from "express";
import request from "supertest";

import usersRouter from "./users";

function createUsersRouteTestApp() {
  const app = express();

  app.use(express.json());
  app.use("/users", usersRouter);

  return app;
}

test("GET /users returns the current empty-list placeholder", async () => {
  const response = await request(createUsersRouteTestApp()).get("/users").expect(200);

  assert.deepEqual(response.body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});

test("POST /users returns the stub user id and submitted fields", async () => {
  const payload = {
    email: "jamie@example.com",
    name: "Jamie Currier"
  };

  const response = await request(createUsersRouteTestApp())
    .post("/users")
    .send(payload)
    .expect(201);

  assert.deepEqual(response.body, {
    data: {
      id: "stub-user-id",
      ...payload
    },
    message: "User creation is not implemented yet."
  });
});
