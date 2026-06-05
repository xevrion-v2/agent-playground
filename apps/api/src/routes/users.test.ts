import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "./users.js";

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns 200 with an empty data array", async () => {
    const res = await request(buildApp()).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("includes a message field in the response", async () => {
    const res = await request(buildApp()).get("/users");
    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
  });
});

describe("POST /users", () => {
  it("returns 201 when a valid JSON body is provided", async () => {
    const res = await request(buildApp())
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" });
    expect(res.status).toBe(201);
  });

  it("echoes the request body inside data", async () => {
    const payload = { name: "Bob", email: "bob@example.com" };
    const res = await request(buildApp()).post("/users").send(payload);
    expect(res.body.data).toMatchObject(payload);
  });

  it("assigns a stub id to the created user", async () => {
    const res = await request(buildApp())
      .post("/users")
      .send({ email: "charlie@example.com" });
    expect(res.body.data).toHaveProperty("id");
    expect(typeof res.body.data.id).toBe("string");
  });

  it("includes a message field confirming creation", async () => {
    const res = await request(buildApp())
      .post("/users")
      .send({ email: "dave@example.com" });
    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
  });
});
