import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("User Routes", () => {
  describe("GET /users", () => {
    it("returns 200 with an empty data array", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: [],
        message: "User listing is not implemented yet.",
      });
    });

    it("returns JSON content type", async () => {
      const res = await request(app).get("/users");
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("POST /users", () => {
    it("returns 201 with the posted body and a stub id", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "Alice", email: "alice@example.com" });
      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({
        id: "stub-user-id",
        name: "Alice",
        email: "alice@example.com",
      });
    });

    it("includes a not-implemented message", async () => {
      const res = await request(app).post("/users").send({});
      expect(res.body.message).toBe("User creation is not implemented yet.");
    });
  });
});
