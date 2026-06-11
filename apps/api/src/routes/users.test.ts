import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "./users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("User Routes", () => {
  describe("GET /users", () => {
    it("should return 200 status", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
    });

    it("should return empty data array", async () => {
      const response = await request(app).get("/users");
      expect(response.body.data).toEqual([]);
    });

    it("should return not implemented message", async () => {
      const response = await request(app).get("/users");
      expect(response.body.message).toBe("User listing is not implemented yet.");
    });
  });

  describe("POST /users", () => {
    it("should return 201 status", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "Test User", email: "test@example.com" });
      expect(response.status).toBe(201);
    });

    it("should return user with stub id and request body", async () => {
      const userData = { name: "Test User", email: "test@example.com" };
      const response = await request(app).post("/users").send(userData);
      expect(response.body.data).toEqual({
        id: "stub-user-id",
        ...userData
      });
    });

    it("should return not implemented message", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "Test User" });
      expect(response.body.message).toBe("User creation is not implemented yet.");
    });
  });
});
