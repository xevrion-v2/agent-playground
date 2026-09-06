import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../routes/users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns 200 with empty data array and stub message", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(0);
    expect(res.body.message).toContain("not implemented");
  });

  it("returns JSON content type", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});

describe("POST /users", () => {
  it("returns 201 with stub user id and request body merged", async () => {
    const app = createApp();
    const payload = { name: "Alice", email: "alice@example.com" };
    const res = await request(app).post("/users").send(payload);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toHaveProperty("name", "Alice");
    expect(res.body.data).toHaveProperty("email", "alice@example.com");
    expect(res.body.message).toContain("not implemented");
  });

  it("returns 201 even with empty body (stub behavior)", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.message).toContain("not implemented");
  });

  it("returns JSON content type", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ name: "Bob" });
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
