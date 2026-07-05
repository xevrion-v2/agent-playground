import { test } from "node:test";
import assert from "node:assert";
import { escapeRegExp } from "./escapeRegExp";

test("escapeRegExp utility tests", async (t) => {
  await t.test("leaves normal strings unchanged", () => {
    assert.strictEqual(escapeRegExp("hello world"), "hello world");
  });

  await t.test("escapes dot character", () => {
    assert.strictEqual(escapeRegExp("hello.world"), "hello\\.world");
  });

  await t.test("escapes star character", () => {
    assert.strictEqual(escapeRegExp("hello*world"), "hello\\*world");
  });

  await t.test("escapes plus character", () => {
    assert.strictEqual(escapeRegExp("hello+world"), "hello\\+world");
  });

  await t.test("escapes question mark", () => {
    assert.strictEqual(escapeRegExp("hello?world"), "hello\\?world");
  });

  await t.test("escapes caret character", () => {
    assert.strictEqual(escapeRegExp("^hello"), "\\^hello");
  });

  await t.test("escapes dollar character", () => {
    assert.strictEqual(escapeRegExp("hello$"), "hello\\$");
  });

  await t.test("escapes curly braces", () => {
    assert.strictEqual(escapeRegExp("hello{world}"), "hello\\{world\\}");
  });

  await t.test("escapes parentheses", () => {
    assert.strictEqual(escapeRegExp("hello(world)"), "hello\\(world\\)");
  });

  await t.test("escapes square brackets", () => {
    assert.strictEqual(escapeRegExp("hello[world]"), "hello\\[world\\]");
  });

  await t.test("escapes pipe character", () => {
    assert.strictEqual(escapeRegExp("hello|world"), "hello\\|world");
  });

  await t.test("escapes backslash character", () => {
    assert.strictEqual(escapeRegExp("hello\\world"), "hello\\\\world");
  });

  await t.test("escapes a string containing all special characters", () => {
    const specialChars = ".*+?^${}()|[]\\";
    const expected = "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\";
    assert.strictEqual(escapeRegExp(specialChars), expected);
  });

  await t.test("handles empty string gracefully", () => {
    assert.strictEqual(escapeRegExp(""), "");
  });

  await t.test("handles null input gracefully", () => {
    assert.strictEqual(escapeRegExp(null), "");
  });

  await t.test("handles undefined input gracefully", () => {
    assert.strictEqual(escapeRegExp(undefined), "");
  });

  await t.test("converts and handles numeric inputs gracefully", () => {
    assert.strictEqual(escapeRegExp(12345), "12345");
  });

  await t.test("converts and handles float numbers", () => {
    assert.strictEqual(escapeRegExp(12.34), "12\\.34");
  });
});
