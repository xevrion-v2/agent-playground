import { describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";

import usersRouter from "../src/routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

const VALID = { email: "Ada@Example.COM", name: "  Ada Lovelace  " };

describe("POST /users", () => {
  it("creates a user with a server-generated id and normalized fields", async () => {
    const res = await request(app).post("/users").send(VALID);
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.id).not.toBe("stub-user-id");
    expect(res.body.data.email).toBe("ada@example.com");
    expect(res.body.data.name).toBe("Ada Lovelace");
  });

  it("normalizes an absent name to null", async () => {
    const res = await request(app).post("/users").send({ email: "grace@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("grace@example.com");
    expect(res.body.data.name).toBeNull();
  });

  it("rejects a missing or invalid email", async () => {
    for (const body of [{}, { email: "" }, { email: "not-an-email" }, { email: "a@b" }]) {
      const res = await request(app).post("/users").send(body);
      expect(res.status).toBe(400);
    }
  });

  it("rejects non-object JSON bodies with 400", async () => {
    const arrayRes = await request(app).post("/users").send([]);
    expect(arrayRes.status).toBe(400);

    const nullRes = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send("null");
    expect(nullRes.status).toBe(400);

    const rawStringRes = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send('"plain-json-string"');
    expect(rawStringRes.status).toBe(400);
  });

  it("ignores client-controlled id and unrelated fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({ ...VALID, id: "client-id", role: "admin", extra: true });
    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("client-id");
    expect(res.body.data.email).toBe("ada@example.com");
    expect(res.body.data.role).toBeUndefined();
    expect(res.body.data.extra).toBeUndefined();
  });
});
