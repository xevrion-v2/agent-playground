import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isKangxiRadicalLifePresent } from "./is-kangxi-radical-life-present.js";

describe("isKangxiRadicalLifePresent (U+2F63 ⽣)", () => {
  it("returns true when the life radical is present", () => {
    assert.equal(isKangxiRadicalLifePresent("\u2F63"), true);
    assert.equal(isKangxiRadicalLifePresent("prefix\u2F63suffix"), true);
    assert.equal(isKangxiRadicalLifePresent("a\u2F63b"), true);
  });

  it("returns false when the life radical is absent", () => {
    assert.equal(isKangxiRadicalLifePresent(""), false);
    assert.equal(isKangxiRadicalLifePresent("life"), false);
    assert.equal(isKangxiRadicalLifePresent("\u2F65"), false); // field, not life
    assert.equal(isKangxiRadicalLifePresent("\u2F62"), false); // sweet, not life
  });
});
