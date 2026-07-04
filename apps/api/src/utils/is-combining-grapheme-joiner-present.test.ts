import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isCombiningGraphemeJoinerPresent } from "./is-combining-grapheme-joiner-present";

describe("isCombiningGraphemeJoinerPresent", () => {
  it("returns true when the input contains U+034F", () => {
    assert.equal(isCombiningGraphemeJoinerPresent("a\u034fb"), true);
  });

  it("returns false when the input does not contain U+034F", () => {
    assert.equal(isCombiningGraphemeJoinerPresent("plain text"), false);
  });

  it("does not match other invisible formatting characters", () => {
    assert.equal(isCombiningGraphemeJoinerPresent("a\u200bb"), false);
  });
});
