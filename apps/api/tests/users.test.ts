import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/index";

describe("Users Routes", () => {
  describe("GET /users", () => {
    it("should return the user listing stub", async () => {
      const response = await request(app).get("/users");
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: [],
        message: "User listing is not implemented yet."
      });
    });
  });

  describe("POST /users", () => {
    it("should return the user creation stub with provided body", async () => {
      const payload = { email: "test@example.com", name: "Test User" };
      
      const response = await request(app)
        .post("/users")
        .send(payload)
        .set("Content-Type", "application/json");
        
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        data: {
          id: "stub-user-id",
          email: "test@example.com",
          name: "Test User"
        },
        message: "User creation is not implemented yet."
      });
    });
  });
});
