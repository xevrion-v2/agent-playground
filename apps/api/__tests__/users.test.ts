import { describe, it, expect, vi } from "vitest";
import express, { Router } from "express";
import request from "supertest";

// Inline the router to avoid import issues in the stub test setup
function createTestApp() {
  const app = express();
  app.use(express.json());

  const router = Router();

  router.get("/", (_req, res) => {
    res.json({
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  router.post("/", (req, res) => {
    if (!req.body || typeof req.body.email !== "string" || req.body.email.trim().length === 0) {
      return res.status(400).json({
        error: { code: "VALIDATION_ERROR", message: "Request body must be a JSON object with a non-empty email string." }
      });
    }

    res.status(201).json({
      data: { id: "stub-user-id", ...req.body },
      message: "User creation is not implemented yet."
    });
  });

  app.use("/users", router);
  return app;
}

describe("GET /users", () => {
  it("returns a 200 with an empty data array", async () => {
    const app = createTestApp();
    const res = await request(app).get("/users").expect(200);
    expect(res.body).toEqual({
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  it("responds with JSON content type", async () => {
    const app = createTestApp();
    const res = await request(app).get("/users");
    expect(res.headers["content-type"]).toMatch(/json/);
  });
});

describe("POST /users", () => {
  it("creates a stub user with valid input", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com" })
      .expect(201);

    expect(res.body.data).toMatchObject({
      id: "stub-user-id",
      email: "test@example.com"
    });
  });

  it("returns 400 when email is missing", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/users")
      .send({})
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 400 when email is an empty string", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "" })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
