import { describe, it, expect, vi } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users";

describe("Users routes", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/users", usersRouter);
  });

  describe("GET /users", () => {
    it("returns 200 with data array", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("POST /users", () => {
    it("returns 201 with user data on valid input", async () => {
      const res = await request(app).post("/users").send({ email: "a@b.com", name: "Alice" });
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("id");
    });

    it("returns 400 when body is not an object", async () => {
      const res = await request(app).post("/users").send("invalid");
      expect(res.status).toBe(400);
    });

    it("returns 400 when email is not a string", async () => {
      const res = await request(app).post("/users").send({ email: 123 });
      expect(res.status).toBe(400);
    });
  });

  describe("GET /users/:id", () => {
    it("returns 501 (not implemented)", async () => {
      const res = await request(app).get("/users/123");
      expect(res.status).toBe(501);
    });
  });
});
