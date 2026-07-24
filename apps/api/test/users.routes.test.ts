import express from "express";
import request from "supertest";
import { describe, it, expect } from "vitest";

import usersRouter from "../src/routes/users";

/**
 * Mount the users router on a minimal app so the route behavior can be tested
 * in isolation, without starting the real server.
 */
function makeApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns 200 with an empty data list envelope", async () => {
    const res = await request(makeApp()).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [],
      message: "User listing is not implemented yet."
    });
  });
});

describe("POST /users", () => {
  it("returns 201 and echoes the body alongside a stub id", async () => {
    const res = await request(makeApp())
      .post("/users")
      .send({ name: "Ada", email: "ada@example.com" });

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      id: "stub-user-id",
      name: "Ada",
      email: "ada@example.com"
    });
    expect(res.body.message).toBe("User creation is not implemented yet.");
  });

  it("returns 201 with just the stub id when no body is sent", async () => {
    const res = await request(makeApp()).post("/users").send();

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual({ id: "stub-user-id" });
  });
});
