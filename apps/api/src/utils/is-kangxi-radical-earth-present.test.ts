import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isKangxiRadicalEarthPresent } from "./is-kangxi-radical-earth-present";

describe("isKangxiRadicalEarthPresent", () => {
  it("returns true when the input contains U+2F1F", () => {
    assert.equal(isKangxiRadicalEarthPresent("soil-\u2F1F-marker"), true);
  });

  it("returns false when the input does not contain U+2F1F", () => {
    assert.equal(isKangxiRadicalEarthPresent("soil-\u571F-marker"), false);
  });

  it("does not match another Kangxi radical", () => {
    assert.equal(isKangxiRadicalEarthPresent("radical-\u2F20-marker"), false);
  });
});
