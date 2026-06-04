import request from "supertest";
import app from "../index";

describe("User Routes Security", () => {
  describe("POST /users", () => {
    it("should only return whitelisted fields", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "Test User",
          email: "test@example.com",
          isAdmin: true,  // Should be ignored
          role: "admin",  // Should be ignored
          password: "secret",  // Should be ignored
        });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Test User");
      expect(res.body.data.email).toBe("test@example.com");
      expect(res.body.data.isAdmin).toBeUndefined();
      expect(res.body.data.role).toBeUndefined();
      expect(res.body.data.password).toBeUndefined();
    });

    it("should validate input", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "",  // Invalid: empty
          email: "not-an-email",  // Invalid: not email
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Validation failed");
    });

    it("should reject missing required fields", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "Test User",
          // Missing email
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /users", () => {
    it("should return empty list", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
      expect(res.body.data.uptime).toBeDefined();
      expect(res.body.data.timestamp).toBeDefined();
    });
  });
});
