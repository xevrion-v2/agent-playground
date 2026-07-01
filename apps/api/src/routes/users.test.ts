import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "./users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("POST /users", () => {
  it("creates a user with valid email and name", async () => {
    const res = await request(app).post("/users").send({ email: "test@test.com", name: "Alice" }).expect(201);
    expect(res.body.data.email).toBe("test@test.com");
    expect(res.body.data.id).toBe("stub-user-id");
  });

  it("rejects missing email", async () => {
    const res = await request(app).post("/users").send({ name: "No Email" }).expect(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects invalid email", async () => {
    const res = await request(app).post("/users").send({ email: "bad" }).expect(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects non-object body", async () => {
    await request(app).post("/users").send([]).expect(400);
  });

  it("rejects empty body", async () => {
    await request(app).post("/users").send({}).expect(400);
  });

  it("validates name must be string", async () => {
    const res = await request(app).post("/users").send({ email: "a@b.com", name: 123 }).expect(400);
    expect(res.body.error).toBeDefined();
  });
});
