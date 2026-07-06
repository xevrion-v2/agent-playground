import { strict as assert } from "node:assert";
import { test } from "node:test";

import { createUserFromBody } from "./users";

test("rejects non-object JSON bodies", () => {
  const nullResult = createUserFromBody(null);
  const arrayResult = createUserFromBody(["not", "an", "object"]);
  const stringResult = createUserFromBody("hello");

  assert.equal(nullResult.ok, false);
  assert.equal(arrayResult.ok, false);
  assert.equal(stringResult.ok, false);

  if (!nullResult.ok) {
    assert.equal(nullResult.status, 400);
  }
});

test("requires a valid email", () => {
  const missingEmail = createUserFromBody({});
  const invalidEmail = createUserFromBody({ email: "not-an-email" });
  const emptyEmail = createUserFromBody({ email: "   " });

  assert.equal(missingEmail.ok, false);
  assert.equal(invalidEmail.ok, false);
  assert.equal(emptyEmail.ok, false);
});

test("normalizes email and trims optional name", () => {
  const result = createUserFromBody({
    email: "  USER@Example.COM  ",
    name: "  Ada Lovelace  "
  });

  assert.equal(result.ok, true);

  if (result.ok) {
    assert.match(result.user.id, /^usr_[0-9a-f-]{36}$/);
    assert.equal(result.user.email, "user@example.com");
    assert.equal(result.user.name, "Ada Lovelace");
  }
});

test("ignores client-controlled id and unrelated fields", () => {
  const result = createUserFromBody({
    email: "user@example.com",
    id: "client-id",
    role: "admin",
    name: "User"
  });

  assert.equal(result.ok, true);

  if (result.ok) {
    assert.notEqual(result.user.id, "client-id");
    assert.deepEqual(result.user, {
      id: result.user.id,
      email: "user@example.com",
      name: "User"
    });
  }
});

test("converts blank or missing names to null", () => {
  const missingName = createUserFromBody({ email: "user@example.com" });
  const blankName = createUserFromBody({ email: "user@example.com", name: "   " });
  const nonStringName = createUserFromBody({ email: "user@example.com", name: 123 });

  assert.equal(missingName.ok, true);
  assert.equal(blankName.ok, true);
  assert.equal(nonStringName.ok, true);

  if (missingName.ok && blankName.ok && nonStringName.ok) {
    assert.equal(missingName.user.name, null);
    assert.equal(blankName.user.name, null);
    assert.equal(nonStringName.user.name, null);
  }
});
