import assert from "node:assert/strict";
import test from "node:test";

import { validateCreateUserPayload } from "./users";

test("rejects non-object request bodies", () => {
  for (const body of [null, [], "user@example.com", 42, true]) {
    const result = validateCreateUserPayload(body);
    assert.equal(result.ok, false);
  }
});

test("requires a valid email", () => {
  for (const body of [{}, { email: "" }, { email: "invalid" }, { email: "a@b" }]) {
    const result = validateCreateUserPayload(body);
    assert.equal(result.ok, false);
  }
});

test("normalizes email and optional name", () => {
  const result = validateCreateUserPayload({
    email: "  USER@Example.COM ",
    name: "  Ada Lovelace  "
  });

  assert.deepEqual(result, {
    ok: true,
    value: {
      email: "user@example.com",
      name: "Ada Lovelace"
    }
  });
});

test("ignores client-controlled id and unrelated fields", () => {
  const result = validateCreateUserPayload({
    id: "client-id",
    email: "user@example.com",
    role: "admin",
    unexpected: true
  });

  assert.deepEqual(result, {
    ok: true,
    value: {
      email: "user@example.com"
    }
  });
});

test("drops a blank optional name after normalization", () => {
  const result = validateCreateUserPayload({
    email: "user@example.com",
    name: "   "
  });

  assert.deepEqual(result, {
    ok: true,
    value: {
      email: "user@example.com"
    }
  });
});
