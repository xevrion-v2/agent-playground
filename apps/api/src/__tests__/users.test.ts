import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  isValidEmail,
  isValidUsername,
  validateUser,
} from "../routes/users.ts";

describe("User route validation helpers", () => {
  describe("isValidEmail", () => {
    it("should accept valid email addresses", () => {
      assert.ok(isValidEmail("user@example.com"));
      assert.ok(isValidEmail("test.user@domain.co.uk"));
      assert.ok(isValidEmail("a+b@c.com"));
    });

    it("should reject invalid email addresses", () => {
      assert.ok(!isValidEmail(""));
      assert.ok(!isValidEmail("notanemail"));
      assert.ok(!isValidEmail("@domain.com"));
      assert.ok(!isValidEmail("user@"));
      assert.ok(!isValidEmail("user @example.com"));
    });
  });

  describe("isValidUsername", () => {
    it("should accept valid usernames", () => {
      assert.ok(isValidUsername("abc"));
      assert.ok(isValidUsername("user_name"));
      assert.ok(isValidUsername("user-name"));
      assert.ok(isValidUsername("UserName123"));
      assert.ok(isValidUsername("a".repeat(30)));
    });

    it("should reject usernames that are too short", () => {
      assert.ok(!isValidUsername("ab"));
      assert.ok(!isValidUsername("a"));
    });

    it("should reject usernames that are too long", () => {
      assert.ok(!isValidUsername("a".repeat(31)));
    });

    it("should reject usernames with invalid characters", () => {
      assert.ok(!isValidUsername("user name"));
      assert.ok(!isValidUsername("user@name"));
      assert.ok(!isValidUsername("user.name"));
    });

    it("should reject non-string inputs", () => {
      assert.ok(!isValidUsername(null as any));
      assert.ok(!isValidUsername(undefined as any));
      assert.ok(!isValidUsername(123 as any));
    });
  });

  describe("validateUser", () => {
    it("should return no errors for valid input", () => {
      const errors = validateUser({ email: "test@example.com", username: "validuser" });
      assert.equal(errors.length, 0);
    });

    it("should return error for missing email", () => {
      const errors = validateUser({ username: "validuser" });
      assert.ok(errors.some((e) => e.field === "email"));
    });

    it("should return error for invalid email format", () => {
      const errors = validateUser({ email: "notanemail", username: "validuser" });
      assert.ok(errors.some((e) => e.field === "email" && e.message.includes("valid")));
    });

    it("should return error for missing username", () => {
      const errors = validateUser({ email: "test@example.com" });
      assert.ok(errors.some((e) => e.field === "username"));
    });

    it("should return error for invalid username", () => {
      const errors = validateUser({ email: "test@example.com", username: "ab" });
      assert.ok(errors.some((e) => e.field === "username"));
    });

    it("should return multiple errors when both fields are invalid", () => {
      const errors = validateUser({});
      assert.ok(errors.length >= 2);
    });
  });
});
