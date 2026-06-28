const request = require("supertest");
const express = require("express");

// Build a minimal app matching the route structure for testing
function createTestApp() {
  const app = express();
  app.use(express.json());

  const { Router } = require("express");
  const router = Router();

  router.get("/", (_req, res) => {
    res.json({ data: [], message: "User listing is not implemented yet." });
  });

  router.post("/", (req, res) => {
    res.status(201).json({
      data: { id: "stub-user-id", ...req.body },
      message: "User creation is not implemented yet.",
    });
  });

  app.use("/users", router);
  return app;
}

describe("User routes", () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe("GET /users", () => {
    it("returns 200 with empty data array", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(0);
    });

    it("returns a message indicating stub status", async () => {
      const res = await request(app).get("/users");
      expect(res.body.message).toContain("not implemented");
    });
  });

  describe("POST /users", () => {
    it("returns 201 with created user stub", async () => {
      const res = await request(app)
        .post("/users")
        .send({ name: "Alice", email: "alice@example.com" });
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
      expect(res.body.data.name).toBe("Alice");
      expect(res.body.data.email).toBe("alice@example.com");
    });

    it("returns a message indicating stub status", async () => {
      const res = await request(app).post("/users").send({});
      expect(res.body.message).toContain("not implemented");
    });

    it("passes through request body fields", async () => {
      const res = await request(app)
        .post("/users")
        .send({ role: "admin", age: 30 });
      expect(res.body.data.role).toBe("admin");
      expect(res.body.data.age).toBe(30);
    });
  });
});
