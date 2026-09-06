import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import { app } from "../index.js";

test("POST /users payload validation", async (t) => {
  await t.test("accepts valid name and email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" });
    
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.data.name, "Alice");
    assert.strictEqual(res.body.data.email, "alice@example.com");
  });

  await t.test("rejects missing name", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com" });
    
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.error, "Invalid or missing 'name'");
  });

  await t.test("rejects missing email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice" });
    
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.error, "Invalid or missing 'email'");
  });

  await t.test("rejects invalid email format", async () => {
    const invalidEmails = ["not-an-email", "alice@", "@example.com", "alice@example", ""];
    
    for (const email of invalidEmails) {
      const res = await request(app)
        .post("/users")
        .send({ name: "Alice", email });
      
      assert.strictEqual(res.status, 400, `Expected 400 for email: ${email}`);
      // for empty string it fails the missing email check
      if (email === "") {
        assert.strictEqual(res.body.error, "Invalid or missing 'email'");
      } else {
        assert.strictEqual(res.body.error, "Invalid email format");
      }
    }
  });
});
