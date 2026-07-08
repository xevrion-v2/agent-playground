import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isKangxiRadicalSproutPresent } from "./is-kangxi-radical-sprout-present";

describe("isKangxiRadicalSproutPresent", () => {
  it("returns true when the input contains U+2F2C", () => {
    assert.equal(isKangxiRadicalSproutPresent("sprout-\u2F2C-marker"), true);
  });

  it("returns false when the input does not contain U+2F2C", () => {
    assert.equal(isKangxiRadicalSproutPresent("sprout-\u8279-marker"), false);
  });

  it("does not match another Kangxi radical", () => {
    assert.equal(isKangxiRadicalSproutPresent("radical-\u2F2D-marker"), false);
  });
});
