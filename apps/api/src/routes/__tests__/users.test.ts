import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "./users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("should return 200 with an empty data array", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual([]);
    expect(res.body).toHaveProperty("message");
  });

  it("should return a not-implemented message", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.body.message).toContain("not implemented");
  });
});

describe("POST /users", () => {
  it("should return 201 with a stub user", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "Test User", email: "test@example.com" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toHaveProperty("name", "Test User");
    expect(res.body.data).toHaveProperty("email", "test@example.com");
  });

  it("should return a not-implemented message", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({});
    expect(res.body.message).toContain("not implemented");
  });

  it("should preserve extra fields from request body", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ username: "john", age: 25 });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("username", "john");
    expect(res.body.data).toHaveProperty("age", 25);
  });
});
