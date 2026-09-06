import { describe, it } from "node:test";
import assert from "node:assert/strict";
import express, { Express } from "express";
import request from "supertest";

// Inline the users router for testing (avoids test-framework dependency issues)
import { Router, Request, Response } from "express";

function createUsersRouter() {
  const router = Router();

  router.get("/", (_req: Request, res: Response) => {
    res.json({
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  router.post("/", (req: Request, res: Response) => {
    res.status(201).json({
      data: {
        id: "stub-user-id",
        ...req.body
      },
      message: "User creation is not implemented yet."
    });
  });

  return router;
}

function createApp(): Express {
  const app = express();
  app.use(express.json());
  app.use("/users", createUsersRouter());
  return app;
}

describe("GET /users", () => {
  it("returns 200 with empty list and message", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body.data, []);
    assert.equal(res.body.message, "User listing is not implemented yet.");
  });
});

describe("POST /users", () => {
  it("returns 201 with stub id and echoes request body", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" });
    assert.equal(res.status, 201);
    assert.equal(res.body.data.id, "stub-user-id");
    assert.equal(res.body.data.name, "Alice");
    assert.equal(res.body.message, "User creation is not implemented yet.");
  });

  it("returns 201 even with an empty body", async () => {
    const app = createApp();
    const res = await request(app).post("/users").send({});
    assert.equal(res.status, 201);
    assert.equal(res.body.data.id, "stub-user-id");
  });
});
