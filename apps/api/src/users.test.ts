import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import express from "express";

import usersRouter from "./routes/users.js";
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const response = await request(app)
    .post("/users")
    .send({ email: "not-an-email" });

  assert.equal(response.status, 400);
  assert.equal(response.headers["content-type"]?.includes("json"), true);
});
