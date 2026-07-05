import { test } from "node:test";
import assert from "node:assert";
import { slugify } from "./slugify";

test("slugify utility tests", async (t) => {
  await t.test("converts simple string to lowercase and replaces spaces", () => {
    assert.strictEqual(slugify("Hello World"), "hello-world");
  });

  await t.test("replaces underscores with hyphens", () => {
    assert.strictEqual(slugify("Hello_World"), "hello-world");
  });

  await t.test("collapses multiple spaces or underscores", () => {
    assert.strictEqual(slugify("Hello   World___Test"), "hello-world-test");
  });

  await t.test("removes special characters", () => {
    assert.strictEqual(slugify("Hello, World! @2026 #cool"), "hello-world-2026-cool");
  });

  await t.test("handles leading and trailing spaces and hyphens gracefully", () => {
    assert.strictEqual(slugify("  -Hello World-  "), "hello-world");
  });

  await t.test("handles empty string input gracefully", () => {
    assert.strictEqual(slugify(""), "");
  });

  await t.test("handles null input gracefully", () => {
    assert.strictEqual(slugify(null), "");
  });

  await t.test("handles undefined input gracefully", () => {
    assert.strictEqual(slugify(undefined), "");
  });

  await t.test("converts and handles numeric inputs gracefully", () => {
    assert.strictEqual(slugify(12345), "12345");
  });

  await t.test("converts and handles float numbers", () => {
    assert.strictEqual(slugify(12.34), "1234");
  });
});
