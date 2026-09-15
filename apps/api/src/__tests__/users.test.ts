import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns an empty list initially", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });
});

describe("POST /users", () => {
  it("creates a user with valid email and name", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com", name: "Alice" });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      email: "alice@example.com",
      name: "Alice",
    });
    expect(res.body.data.id).toBeDefined();
  });

  it("rejects missing email", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ name: "Bob" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects invalid email", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects client-supplied id", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "test@test.com", id: "client-given-id" });
    expect(res.status).toBe(201);
    // id should be server-generated, not the client value
    expect(res.body.data.id).not.toBe("client-given-id");
  });

  it("ignores extra fields from request body", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "a@b.com", role: "admin", admin: true });
    expect(res.status).toBe(201);
    // Extra fields should not appear in response
    expect(res.body.data.role).toBeUndefined();
    expect(res.body.data.admin).toBeUndefined();
  });

  it("makes created users visible via GET", async () => {
    const app = createApp();
    await request(app)
      .post("/users")
      .send({ email: "alice@example.com", name: "Alice" });
    const list = await request(app).get("/users");
    expect(list.body.data).toHaveLength(1);
    expect(list.body.data[0].email).toBe("alice@example.com");
  });

  it("rejects non-string email", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ email: 123 });
    expect(res.status).toBe(400);
  });

  it("rejects non-string name", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({
      email: "test@test.com",
      name: 42,
    });
    expect(res.status).toBe(400);
  });
});
