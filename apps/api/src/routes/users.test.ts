import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "./users.js";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("POST /users", () => {
  it("succeeds with a valid user payload", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" });

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      id: "stub-user-id",
      name: "Alice",
      email: "alice@example.com"
    });
  });

  it("fails when email is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email must be a non-empty string/);
  });

  it("fails when email is empty", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email must be a non-empty string/);
  });

  it("fails when email is malformed", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email must be a valid email address/);
  });

  it("fails when name is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name must be a non-empty string/);
  });

  it("fails when name is empty", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "", email: "alice@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name must be a non-empty string/);
  });
});
