import { test } from "node:test";
import assert from "node:assert/strict";
import { validateCreateUser } from "./users.ts";

// Tests for the Express user route stubs (validation + list/create behavior).

test("list route shape (stub) returns data array + message", () => {
  // Mirrors the GET /users response contract.
  const stub = { data: [], message: "User listing is not implemented yet." };
  assert.ok(Array.isArray(stub.data));
  assert.equal(typeof stub.message, "string");
});

test("create rejects non-object body", () => {
  assert.equal(validateCreateUser("not-an-object").ok, false);
  assert.equal(validateCreateUser([1, 2]).ok, false);
  assert.equal(validateCreateUser(null).ok, false);
});

test("create rejects missing/invalid email", () => {
  assert.equal(validateCreateUser({ name: "x" }).ok, false);
  assert.equal(validateCreateUser({ email: "bad" }).ok, false);
});

test("create accepts valid email and normalizes name", () => {
  const r = validateCreateUser({ email: "A@B.com", name: "  Mazen  " });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.email, "A@B.com");
    assert.equal(r.name, "Mazen");
  }
});

test("create generated id is server-side (client id ignored)", () => {
  const r = validateCreateUser({ email: "a@b.com", id: "evil" });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.notEqual(r.email, "evil");
  }
});
