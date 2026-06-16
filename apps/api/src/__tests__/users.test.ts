import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("User Routes", () => {
  describe("GET /users", () => {
    it("should return 200 with empty data array and not-implemented message", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(0);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toContain("not implemented");
    });

    it("should return JSON content type", async () => {
      const res = await request(app).get("/users");
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("POST /users", () => {
    it("should return 201 with stub data including request body fields", async () => {
      const userData = { name: "Test User", email: "test@example.com" };
      const res = await request(app).post("/users").send(userData);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
      expect(res.body.data).toHaveProperty("name", "Test User");
      expect(res.body.data).toHaveProperty("email", "test@example.com");
      expect(res.body).toHaveProperty("message");
    });

    it("should handle empty body correctly", async () => {
      const res = await request(app).post("/users").send({});
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
    });
  });
});
