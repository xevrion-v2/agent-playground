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
  it("should return 200 with empty data array", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });
});

describe("POST /users", () => {
  it("should return 201 with valid payload", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ name: "Test", email: "test@test.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe("stub-user-id");
    expect(res.body.data.name).toBe("Test");
    expect(res.body.data.email).toBe("test@test.com");
  });

  it("should return 400 when name is missing", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ email: "test@test.com" });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain("name");
  });

  it("should return 400 when email is missing", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ name: "Test" });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain("email");
  });

  it("should return 400 when email is invalid", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ name: "Test", email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain("email");
  });

  it("should return 400 with empty body", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(400);
  });
});
