import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateUserCreationInput,
  UserValidationError,
  handleUserCreation
} from "./users.ts";

test("rejects non-object / array / null bodies", () => {
  for (const bad of [null, "string", 42, [], "not-json"]) {
    assert.throws(() => validateUserCreationInput(bad), UserValidationError);
  }
});

test("requires a valid email", () => {
  assert.throws(() => validateUserCreationInput({}), UserValidationError);
  assert.throws(() => validateUserCreationInput({ email: "nope" }), UserValidationError);
  assert.throws(() => validateUserCreationInput({ email: "  " }), UserValidationError);
  assert.throws(() => validateUserCreationInput({ email: "a@b" }), UserValidationError);
});

test("normalizes email (trim + lowercase)", () => {
  const r = validateUserCreationInput({ email: "  Foo@Bar.COM " });
  assert.equal(r.email, "foo@bar.com");
});

test("normalizes name and ignores client-controlled id / unrelated fields", () => {
  const r = validateUserCreationInput({
    email: "a@b.com",
    name: "  Jane   Doe ",
    id: "evil-client-id",
    admin: true
  });
  assert.equal(r.email, "a@b.com");
  assert.equal(r.name, "Jane Doe");
  assert.ok(!("id" in r));
  assert.ok(!("admin" in r));
});

test("rejects a non-string name when provided", () => {
  assert.throws(
    () => validateUserCreationInput({ email: "a@b.com", name: 123 }),
    UserValidationError
  );
});

test("accepts a valid minimal payload without a name", () => {
  const r = validateUserCreationInput({ email: "user@example.com" });
  assert.equal(r.email, "user@example.com");
  assert.equal(r.name, undefined);
});

function mockRes() {
  const res: any = { statusCode: 0, body: undefined };
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.json = (obj: unknown) => {
    res.body = obj;
    return res;
  };
  return res;
}

test("POST handler returns 201 with a server-generated id for a valid payload", () => {
  const res = mockRes();
  handleUserCreation({ body: { email: "  A@B.COM ", name: " X " } } as any, res);
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.data.email, "a@b.com");
  assert.equal(res.body.data.name, "X");
  assert.match(res.body.data.id, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
});

test("POST handler returns 400 for an invalid payload", () => {
  const res = mockRes();
  handleUserCreation({ body: { notEmail: true } } as any, res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.message, "Invalid user creation payload.");
});
