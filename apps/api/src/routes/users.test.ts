import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../app";

describe("users router", () => {
  it("returns an empty user list with the placeholder message", async () => {
    const response = await request(app).get("/users").expect(200);

    assert.deepEqual(response.body, {
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  it("creates a stub user with HTTP 201", async () => {
    const payload = {
      email: "ada@example.com",
      name: "Ada Lovelace"
    };

    const response = await request(app).post("/users").send(payload).expect(201);

    assert.equal(response.body.message, "User creation is not implemented yet.");
    assert.deepEqual(response.body.data, {
      id: "stub-user-id",
      ...payload
    });
  });

  it("preserves submitted fields on the stub user response", async () => {
    const payload = {
      email: "grace@example.com",
      role: "admin",
      active: true
    };

    const response = await request(app).post("/users").send(payload).expect(201);

    assert.equal(response.body.data.id, "stub-user-id");
    assert.equal(response.body.data.email, payload.email);
    assert.equal(response.body.data.role, payload.role);
    assert.equal(response.body.data.active, payload.active);
  });

  it("mounts the router in-memory without requiring a network listener", async () => {
    const response = await request(app).get("/health").expect(200);

    assert.deepEqual(response.body, {
      status: "ok",
      service: "taskflow-api"
    });
  });
});
