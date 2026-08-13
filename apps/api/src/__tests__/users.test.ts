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
  it("should return 200 with an empty data array and a not-implemented message", async () => {
    const app = createApp();
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toEqual([]);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("not implemented");
  });

  it("should return JSON content type", async () => {
    const app = createApp();
    const res = await request(app).get("/users");

    expect(res.headers["content-type"]).toMatch(/json/);
  });
});

describe("POST /users", () => {
  it("should return 201 with stub user data including the request body fields", async () => {
    const app = createApp();
    const payload = { name: "Alice", email: "alice@example.com" };
    const res = await request(app).post("/users").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toHaveProperty("name", payload.name);
    expect(res.body.data).toHaveProperty("email", payload.email);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("not implemented");
  });

  it("should return 201 even with an empty body", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({});

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
  });
});
