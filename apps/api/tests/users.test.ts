import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../src/routes/users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns a 200 status", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
  });

  it("returns a JSON body with data and message fields", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message");
  });

  it("returns an empty data array", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(0);
  });
});

describe("POST /users", () => {
  it("returns a 201 status", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "Test User", email: "test@example.com" });
    expect(res.status).toBe(201);
  });

  it("returns a stub user with the request body properties", async () => {
    const app = createApp();
    const payload = { name: "Alice", email: "alice@test.com" };
    const res = await request(app).post("/users").send(payload);
    expect(res.body.data).toMatchObject(payload);
  });

  it("returns a stub id in the response", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ name: "Bob" });
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
  });
});
