import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "./users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("POST /users", () => {
  it("creates a user with valid email and name", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com", name: "Alice" })
      .expect(201);
    expect(res.body.data.email).toBe("test@example.com");
    expect(res.body.data.name).toBe("Alice");
    expect(res.body.data.id).toBe("stub-user-id");
  });

  it("accepts no name", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "bob@test.com" })
      .expect(201);
    expect(res.body.data.email).toBe("bob@test.com");
    expect(res.body.data.name).toBeNull();
  });

  it("rejects missing email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "No Email" })
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects invalid email format", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "notanemail" })
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects non-object body (array)", async () => {
    const res = await request(app)
      .post("/users")
      .send([])
      .expect(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects empty body", async () => {
    const res = await request(app)
      .post("/users")
      .send({})
      .expect(400);
    expect(res.body.error).toBeDefined();
  });
});
