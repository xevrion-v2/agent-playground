import test from "node:test";
import assert from "node:assert";
import express from "express";
import request from "supertest";
import usersRouter from "./users.ts";

test("User Routes", async (t) => {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  await t.test("GET /users should return list stub", async () => {
    const res = await request(app).get("/users");
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.body, {
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  await t.test("POST /users should return create stub", async () => {
    const payload = { name: "Test User" };
    const res = await request(app).post("/users").send(payload);
    assert.strictEqual(res.status, 201);
    assert.deepStrictEqual(res.body, {
      data: {
        id: "stub-user-id",
        name: "Test User"
      },
      message: "User creation is not implemented yet."
    });
  });
});
