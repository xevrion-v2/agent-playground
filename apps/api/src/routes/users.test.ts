import { describe, it } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import request from "supertest";
import usersRouter from "./users";

describe("Users API Routes", () => {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  it("GET /users returns empty data array and placeholder message", async () => {
    const res = await request(app).get("/users").expect(200);

    assert.deepStrictEqual(res.body.data, []);
    assert.strictEqual(
      res.body.message,
      "User listing is not implemented yet."
    );
  });

  it("POST /users returns 201 with stub user id and submitted fields", async () => {
    const payload = { name: "Test User", email: "test@example.com" };

    const res = await request(app)
      .post("/users")
      .send(payload)
      .expect(201);

    assert.strictEqual(res.body.data.id, "stub-user-id");
    assert.strictEqual(res.body.data.name, "Test User");
    assert.strictEqual(res.body.data.email, "test@example.com");
    assert.strictEqual(
      res.body.message,
      "User creation is not implemented yet."
    );
  });
});
