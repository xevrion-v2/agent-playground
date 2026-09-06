import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users.js";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("GET /users", () => {
  it("returns 200 with empty data array", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it("returns JSON content type", async () => {
    const res = await request(app).get("/users");
    expect(res.headers["content-type"]).toMatch(/json/);
  });
});

describe("POST /users", () => {
  it("returns 201 with posted body and stub id", async () => {
    const res = await request(app).post("/users").send({ name: "Test" });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Test");
    expect(res.body.data.id).toBe("stub-user-id");
  });

  it("includes not-implemented message", async () => {
    const res = await request(app).post("/users").send({ name: "Test" });
    expect(res.body.message).toMatch(/not implemented/i);
  });
});
