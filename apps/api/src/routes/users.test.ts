import assert from "node:assert/strict";
import { describe, it } from "node:test";

import express from "express";
import request from "supertest";

import usersRouter from "./users";

function createTestApp() {
  const app = express();

  app.use(express.json());
  app.use("/users", usersRouter);

  return app;
}

describe("users router", () => {
  it("returns an empty user list from GET /users", async () => {
    const response = await request(createTestApp()).get("/users");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      data: [],
      message: "User listing is not implemented yet.",
    });
  });

  it("returns the stub id and submitted fields from POST /users", async () => {
    const user = {
      email: "ada@example.com",
      name: "Ada Lovelace",
    };

    const response = await request(createTestApp()).post("/users").send(user);

    assert.equal(response.status, 201);
    assert.deepEqual(response.body, {
      data: {
        id: "stub-user-id",
        ...user,
      },
      message: "User creation is not implemented yet.",
    });
  });
});
