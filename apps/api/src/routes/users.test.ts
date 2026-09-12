import assert from "node:assert/strict";
import test from "node:test";

import { buildUserFromPayload } from "./users";

test("rejects non-object user payloads", () => {
  for (const payload of [null, [], "user", 42, true]) {
    const result = buildUserFromPayload(payload);

    assert.equal(result.ok, false);
  }
});

test("requires a valid email", () => {
  for (const payload of [{}, { email: "" }, { email: "not-an-email" }]) {
    const result = buildUserFromPayload(payload);

    assert.equal(result.ok, false);
  }
});

test("normalizes email and name values", () => {
  const result = buildUserFromPayload({
    email: "  USER@Example.COM ",
    name: "  Ada Lovelace  "
  });

  assert.equal(result.ok, true);
  assert.equal(result.user.email, "user@example.com");
  assert.equal(result.user.name, "Ada Lovelace");
});

test("omits blank optional names", () => {
  const result = buildUserFromPayload({
    email: "user@example.com",
    name: "   "
  });

  assert.equal(result.ok, true);
  assert.equal("name" in result.user, false);
});

test("ignores client-controlled ids and unrelated fields", () => {
  const result = buildUserFromPayload({
    id: "client-id",
    email: "user@example.com",
    role: "admin"
  });

  assert.equal(result.ok, true);
  assert.notEqual(result.user.id, "client-id");
  assert.match(result.user.id, /^user_/);
  assert.deepEqual(Object.keys(result.user).sort(), ["email", "id"]);
});

test("rejects non-string names", () => {
  for (const name of [123, null, undefined]) {
    const result = buildUserFromPayload({
      email: "user@example.com",
      name
    });

    assert.equal(result.ok, false);
  }
});
