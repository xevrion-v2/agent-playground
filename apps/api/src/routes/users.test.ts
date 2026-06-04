import { describe, it, expect } from "vitest";

import express from "express";
import request from "supertest";
import usersRouter from "./users.js";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("GET /users", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
  });

  it("returns a data array", async () => {
    const res = await request(app).get("/users");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("includes a message field", async () => {
    const res = await request(app).get("/users");
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /users", () => {
  it("returns 201", async () => {
    const res = await request(app).post("/users").send({ name: "Test" });
    expect(res.status).toBe(201);
  });

  it("echoes the request body in data", async () => {
    const res = await request(app).post("/users").send({ name: "Alice" });
    expect(res.body.data.name).toBe("Alice");
  });

  it("includes a stub id in data", async () => {
    const res = await request(app).post("/users").send({ name: "Bob" });
    expect(res.body.data.id).toBe("stub-user-id");
  });
});
