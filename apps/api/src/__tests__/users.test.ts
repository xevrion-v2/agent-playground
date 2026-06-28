import request from "supertest";
import app from "../../src/index";

describe("User Routes", () => {
  describe("GET /users", () => {
    it("should return an empty list with message", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("POST /users", () => {
    it("should create a user and return 201", async () => {
      const newUser = {
        name: "Test User",
        email: "test@example.com",
      };
      const res = await request(app).post("/users").send(newUser);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body).toHaveProperty("message");
    });

    it("should include the sent fields in the response", async () => {
      const newUser = {
        name: "Jane Doe",
        email: "jane@example.com",
      };
      const res = await request(app).post("/users").send(newUser);
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Jane Doe");
      expect(res.body.data.email).toBe("jane@example.com");
    });
  });
});
