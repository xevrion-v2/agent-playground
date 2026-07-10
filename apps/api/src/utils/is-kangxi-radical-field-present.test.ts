import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isKangxiRadicalFieldPresent } from "./is-kangxi-radical-field-present.js";

describe("isKangxiRadicalFieldPresent (U+2F65 ⽥)", () => {
  it("returns true when the field radical is present", () => {
    assert.equal(isKangxiRadicalFieldPresent("\u2F65"), true);
    assert.equal(isKangxiRadicalFieldPresent("prefix\u2F65suffix"), true);
    assert.equal(isKangxiRadicalFieldPresent("a\u2F65b"), true);
  });

  it("returns false when the field radical is absent", () => {
    assert.equal(isKangxiRadicalFieldPresent(""), false);
    assert.equal(isKangxiRadicalFieldPresent("field"), false);
    assert.equal(isKangxiRadicalFieldPresent("\u2F63"), false); // life, not field
    assert.equal(isKangxiRadicalFieldPresent("\u2F66"), false); // bolt-of-cloth, not field
  });
});
