const test = require("node:test");
const assert = require("node:assert/strict");

const { slugify } = require("./slugify");

test("slugify lowercases words and joins them with hyphens", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("slugify removes punctuation and repeated separators", () => {
  assert.equal(slugify(" Hello,   TaskFlow!!! "), "hello-taskflow");
});

test("slugify handles nullish and empty input gracefully", () => {
  assert.equal(slugify(null), "");
  assert.equal(slugify(undefined), "");
  assert.equal(slugify(""), "");
});

test("slugify keeps numbers and strips diacritics", () => {
  assert.equal(slugify("Café sprint 2026"), "cafe-sprint-2026");
});
