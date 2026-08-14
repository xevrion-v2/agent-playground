import assert from "node:assert/strict";
import test from "node:test";

import { isPunctuationSpacePresent } from "./is-punctuation-space-present";

test("returns true when the value contains a punctuation space", () => {
  assert.equal(isPunctuationSpacePresent("left\u2008right"), true);
  assert.equal(isPunctuationSpacePresent("\u2008leading"), true);
  assert.equal(isPunctuationSpacePresent("trailing\u2008"), true);
});

test("returns false for adjacent spacing characters", () => {
  assert.equal(isPunctuationSpacePresent("left right"), false);
  assert.equal(isPunctuationSpacePresent("left\u2009right"), false);
  assert.equal(isPunctuationSpacePresent("left\u200aright"), false);
  assert.equal(isPunctuationSpacePresent(""), false);
});
