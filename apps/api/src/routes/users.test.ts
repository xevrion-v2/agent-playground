import { test } from "node:test";
import assert from "node:assert/strict";
import { validateUserInput } from "./users.ts";

// These run with `node --test` (Node 26 has built-in test runner + TS via tsx).

test("rejects non-object JSON body (array)", () => {
  const r = validateUserInput([1, 2, 3]);
  assert.equal(r.ok, false);
});

test("rejects null / primitive body", () => {
  assert.equal(validateUserInput(null).ok, false);
  assert.equal(validateUserInput("hi").ok, false);
  assert.equal(validateUserInput(42).ok, false);
});

test("rejects missing email", () => {
  const r = validateUserInput({ name: "A" });
  assert.equal(r.ok, false);
});

test("rejects invalid email format", () => {
  const r = validateUserInput({ email: "not-an-email" });
  assert.equal(r.ok, false);
});

test("rejects email without domain dot", () => {
  const r = validateUserInput({ email: "a@b" });
  assert.equal(r.ok, false);
});

test("accepts valid email, ignores client id + unrelated fields", () => {
  const r = validateUserInput({
    id: "evil-client-id",
    email: "test@example.com",
    name: "  Mazen  ",
    hacker: true,
  });
  assert.equal(r.ok, true);
  assert.equal(r.email, "test@example.com");
  assert.equal(r.name, "Mazen"); // trimmed
  // The function does not echo back client-controlled id or unrelated fields.
  assert.equal("id" in (r as object), false);
});

test("normalizes whitespace-only name to undefined", () => {
  const r = validateUserInput({ email: "a@b.com", name: "   " });
  assert.equal(r.ok, true);
  assert.equal(r.name, undefined);
});
