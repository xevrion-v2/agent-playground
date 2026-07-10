import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isKangxiRadicalSkinPresent } from "./is-kangxi-radical-skin-present.js";
import { isKangxiRadicalWhitePresent } from "./is-kangxi-radical-white-present.js";
import { isKangxiRadicalSicknessPresent } from "./is-kangxi-radical-sickness-present.js";

describe("Kangxi radical utility smoke tests", () => {
  // ── is-kangxi-radical-skin-present (U+2F6A ⽪) ──────────────────────────
  describe("isKangxiRadicalSkinPresent", () => {
    it("returns true when the skin radical is present", () => {
      assert.equal(isKangxiRadicalSkinPresent("\u2F6A"), true);
      assert.equal(isKangxiRadicalSkinPresent("prefix\u2F6Asuffix"), true);
    });

    it("returns false when the skin radical is absent", () => {
      assert.equal(isKangxiRadicalSkinPresent(""), false);
      assert.equal(isKangxiRadicalSkinPresent("skin"), false);
      assert.equal(isKangxiRadicalSkinPresent("\u2F69"), false); // white, not skin
    });
  });

  // ── is-kangxi-radical-white-present (U+2F69 ⽩) ─────────────────────────
  describe("isKangxiRadicalWhitePresent", () => {
    it("returns true when the white radical is present", () => {
      assert.equal(isKangxiRadicalWhitePresent("\u2F69"), true);
      assert.equal(isKangxiRadicalWhitePresent("abc\u2F69xyz"), true);
    });

    it("returns false when the white radical is absent", () => {
      assert.equal(isKangxiRadicalWhitePresent(""), false);
      assert.equal(isKangxiRadicalWhitePresent("white"), false);
      assert.equal(isKangxiRadicalWhitePresent("\u2F6A"), false); // skin, not white
    });
  });

  // ── is-kangxi-radical-sickness-present (U+2F67 ⽧) ──────────────────────
  describe("isKangxiRadicalSicknessPresent", () => {
    it("returns true when the sickness radical is present", () => {
      assert.equal(isKangxiRadicalSicknessPresent("\u2F67"), true);
      assert.equal(isKangxiRadicalSicknessPresent("test\u2F67test"), true);
    });

    it("returns false when the sickness radical is absent", () => {
      assert.equal(isKangxiRadicalSicknessPresent(""), false);
      assert.equal(isKangxiRadicalSicknessPresent("sickness"), false);
      assert.equal(isKangxiRadicalSicknessPresent("\u2F6A"), false); // skin, not sickness
    });
  });
});
