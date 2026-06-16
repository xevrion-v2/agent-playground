import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "./users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("Users routes", () => {
  it("GET /users returns user list", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("POST /users returns 201 with created user", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice" });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("Alice");
  });
});
