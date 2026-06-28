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
  it("should return 200 with empty data array and stub message", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(0);
    expect(res.body.message).toContain("not implemented");
  });
});

describe("POST /users", () => {
  it("should return 201 with stub user data and echo request body", async () => {
    const app = createApp();
    const payload = { name: "Test User", email: "test@example.com" };
    const res = await request(app).post("/users").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toHaveProperty("name", "Test User");
    expect(res.body.data).toHaveProperty("email", "test@example.com");
    expect(res.body.message).toContain("not implemented");
  });

  it("should propagate any body fields into the response data", async () => {
    const app = createApp();
    const payload = { role: "admin", age: 30 };
    const res = await request(app).post("/users").send(payload);
    expect(res.status).toBe(201);
    expect(res.body.data.role).toBe("admin");
    expect(res.body.data.age).toBe(30);
  });

  it("should return 201 with empty body", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe("stub-user-id");
  });
});
