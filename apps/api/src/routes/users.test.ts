import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "./users.js";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns 200 with a data array and a message", async () => {
    const app = createApp();
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty("message");
  });

  it("returns an empty array from the stub", async () => {
    const app = createApp();
    const res = await request(app).get("/users");

    expect(res.body.data).toEqual([]);
  });
});

describe("POST /users", () => {
  it("returns 201 with the posted body echoed back", async () => {
    const app = createApp();
    const payload = { email: "test@example.com", name: "Test User" };
    const res = await request(app).post("/users").send(payload);

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject(payload);
    expect(res.body.data).toHaveProperty("id");
  });

  it("echoes back whatever fields are sent", async () => {
    const app = createApp();
    const payload = { email: "a@b.com" };
    const res = await request(app).post("/users").send(payload);

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("a@b.com");
  });

  it("returns a stub message indicating the route is not implemented", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({ email: "x@y.com" });

    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
  });
});
