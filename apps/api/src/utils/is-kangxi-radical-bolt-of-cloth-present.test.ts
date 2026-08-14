import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isKangxiRadicalBoltOfClothPresent } from "./is-kangxi-radical-bolt-of-cloth-present.js";

describe("isKangxiRadicalBoltOfClothPresent (U+2F66 ⽦)", () => {
  it("returns true when the bolt-of-cloth radical is present", () => {
    assert.equal(isKangxiRadicalBoltOfClothPresent("\u2F66"), true);
    assert.equal(isKangxiRadicalBoltOfClothPresent("prefix\u2F66suffix"), true);
    assert.equal(isKangxiRadicalBoltOfClothPresent("a\u2F66b"), true);
  });

  it("returns false when the bolt-of-cloth radical is absent", () => {
    assert.equal(isKangxiRadicalBoltOfClothPresent(""), false);
    assert.equal(isKangxiRadicalBoltOfClothPresent("bolt-of-cloth"), false);
    assert.equal(isKangxiRadicalBoltOfClothPresent("\u2F65"), false); // field, not bolt-of-cloth
    assert.equal(isKangxiRadicalBoltOfClothPresent("\u2F67"), false); // sickness, not bolt-of-cloth
  });
});
