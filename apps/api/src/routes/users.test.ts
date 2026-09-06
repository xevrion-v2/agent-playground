import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import userRouter from "./users.js";

describe("User Routes", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/users", userRouter);
  });

  describe("GET /users", () => {
    it("should return empty data array with not implemented message", async () => {
      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: [],
        message: "User listing is not implemented yet."
      });
    });
  });

  describe("POST /users", () => {
    it("should return 201 with stub user id and request body", async () => {
      const userData = { name: "Test User", email: "test@example.com" };
      const response = await request(app)
        .post("/users")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({
        id: "stub-user-id",
        ...userData
      });
      expect(response.body.message).toBe("User creation is not implemented yet.");
    });

    it("should handle empty request body", async () => {
      const response = await request(app)
        .post("/users")
        .send({});

      expect(response.status).toBe(201);
      expect(response.body.data.id).toBe("stub-user-id");
      expect(response.body.message).toBe("User creation is not implemented yet.");
    });
  });
});
