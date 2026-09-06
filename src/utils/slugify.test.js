const test = require("node:test");
const assert = require("node:assert/strict");
const { slugify } = require("./slugify");

test("slugify basic words", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("slugify trims whitespace", () => {
  assert.equal(slugify("  spaced  "), "spaced");
});

test("slugify removes special chars", () => {
  assert.equal(slugify("Foo @ Bar!"), "foo-bar");
});

test("slugify collapses separators", () => {
  assert.equal(slugify("a---b__c"), "a-b-c");
});

test("slugify strips edge hyphens", () => {
  assert.equal(slugify("--hello--"), "hello");
});

test("slugify handles numbers", () => {
  assert.equal(slugify("Agent 42"), "agent-42");
});

test("slugify null", () => {
  assert.equal(slugify(null), "");
});

test("slugify undefined", () => {
  assert.equal(slugify(undefined), "");
});

test("slugify empty string", () => {
  assert.equal(slugify(""), "");
});

test("slugify whitespace only", () => {
  assert.equal(slugify("   "), "");
});
