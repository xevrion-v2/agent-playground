const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("../src/utils/slugify.js");

test("slugify converts words to lowercase hyphenated slugs", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("slugify removes punctuation and special characters", () => {
  assert.equal(slugify("TaskFlow: API utility!"), "taskflow-api-utility");
});

test("slugify collapses repeated whitespace, underscores, and hyphens", () => {
  assert.equal(slugify("one   two___three---four"), "one-two-three-four");
});

test("slugify trims leading and trailing separators", () => {
  assert.equal(slugify("  --Ready to Ship--  "), "ready-to-ship");
});

test("slugify handles accents using unicode normalization", () => {
  assert.equal(slugify("Cr\u00e8me Br\u00fbl\u00e9e"), "creme-brulee");
});

test("slugify handles null, undefined, and empty input gracefully", () => {
  assert.equal(slugify(null), "");
  assert.equal(slugify(undefined), "");
  assert.equal(slugify(""), "");
});

test("slugify stringifies non-string input", () => {
  assert.equal(slugify(2026), "2026");
});
