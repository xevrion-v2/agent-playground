import { escapeRegExp } from "./escape-regexp";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("escapeRegExp", () => {
  it("escapes special regex characters", () => {
    assert.equal(escapeRegExp("hello.world"), "hello\.world");
  });

  it("escapes parentheses", () => {
    assert.equal(escapeRegExp("(test)"), "\(test\)");
  });

  it("handles plain text", () => {
    assert.equal(escapeRegExp("helloworld"), "helloworld");
  });

  it("escapes brackets", () => {
    assert.equal(escapeRegExp("[test]"), "\[test\]");
  });

  it("handles empty string", () => {
    assert.equal(escapeRegExp(""), "");
  });
});
