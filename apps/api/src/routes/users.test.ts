import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "./users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("User Routes", () => {
  describe("GET /users", () => {
    it("should return empty data and not implemented message", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: [],
        message: "User listing is not implemented yet."
      });
    });
  });

  describe("POST /users", () => {
    it("should return created user data stub and 201 status", async () => {
      const payload = { name: "Alice", email: "alice@example.com" };
      const res = await request(app)
        .post("/users")
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("User creation is not implemented yet.");
      expect(res.body.data).toEqual({
        id: "stub-user-id",
        name: "Alice",
        email: "alice@example.com"
      });
    });
  });
});
