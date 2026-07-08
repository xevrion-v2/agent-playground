import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isKangxiRadicalCorpsePresent } from "./is-kangxi-radical-corpse-present";

describe("isKangxiRadicalCorpsePresent", () => {
  it("returns true when the input contains U+2F2B", () => {
    assert.equal(isKangxiRadicalCorpsePresent("corpse-\u2F2B-marker"), true);
  });

  it("returns false when the input does not contain U+2F2B", () => {
    assert.equal(isKangxiRadicalCorpsePresent("corpse-\u5C38-marker"), false);
  });

  it("does not match another Kangxi radical", () => {
    assert.equal(isKangxiRadicalCorpsePresent("radical-\u2F2C-marker"), false);
  });
});
