import express from "express";
import { describe, it, expect } from "vitest";
import request from "supertest";
import usersRouter from "./users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("GET /users", () => {
  it("returns an empty data array and a placeholder message", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [],
      message: "User listing is not implemented yet.",
    });
  });
});

describe("POST /users", () => {
  it("returns HTTP 201 with stub user id and submitted fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      data: {
        id: "stub-user-id",
        name: "Alice",
        email: "alice@example.com",
      },
      message: "User creation is not implemented yet.",
    });
  });

  it("returns 201 even with empty body (stub)", async () => {
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
  });
});
