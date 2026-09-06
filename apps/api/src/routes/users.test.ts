import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";

import usersRouter from "./users";

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("users route stubs", () => {
  it("returns an empty user list with the current placeholder message", async () => {
    const response = await request(createTestApp()).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [],
      message: "User listing is not implemented yet.",
    });
  });

  it("creates a stub user with submitted fields and HTTP 201", async () => {
    const submittedUser = {
      email: "dev@example.com",
      name: "TaskFlow Developer",
      role: "maintainer",
    };

    const response = await request(createTestApp())
      .post("/users")
      .send(submittedUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: {
        id: "stub-user-id",
        ...submittedUser,
      },
      message: "User creation is not implemented yet.",
    });
  });
});
