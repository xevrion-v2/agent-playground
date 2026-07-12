import { slugify } from "./slugify";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("slugify", () => {
  it("converts basic words to slug", () => {
    assert.equal(slugify("Hello World"), "hello-world");
  });

  it("handles special characters", () => {
    assert.equal(slugify("Hello!!! World???"), "hello-world");
  });

  it("handles unicode characters", () => {
    assert.equal(slugify("café"), "cafe");
  });

  it("handles empty input", () => {
    assert.equal(slugify(""), "");
  });

  it("handles whitespace", () => {
    assert.equal(slugify("  Hello  World  "), "hello-world");
  });

  it("handles numbers", () => {
    assert.equal(slugify("test123"), "test123");
  });
});
