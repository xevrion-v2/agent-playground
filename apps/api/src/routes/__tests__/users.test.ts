import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("Users Routes", () => {
  describe("GET /users", () => {
    it("should return empty array with success message", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toEqual([]);
      expect(res.body).toHaveProperty("message", "User listing is not implemented yet.");
    });
  });

  describe("POST /users", () => {
    it("should create user stub and return 201", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "Test User", email: "test@example.com" });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
      expect(res.body.data).toHaveProperty("name", "Test User");
      expect(res.body.data).toHaveProperty("email", "test@example.com");
      expect(res.body).toHaveProperty("message", "User creation is not implemented yet.");
    });

    it("should handle empty body", async () => {
      const res = await request(app).post("/users").send({});
      expect(res.status).toBe(201);
    });
  });
});
