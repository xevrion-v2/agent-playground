import assert from "node:assert/strict";
import { test } from "node:test";

import { isEthiopicSyllableQwaPresent } from "../src/utils/is-ethiopic-syllable-qwa-present.ts";

test("detects Ethiopic syllable qwa", () => {
  assert.equal(isEthiopicSyllableQwaPresent("\u1248"), true);
  assert.equal(isEthiopicSyllableQwaPresent("before\u1248after"), true);
});

test("does not match a different syllable or unrelated text", () => {
  assert.equal(isEthiopicSyllableQwaPresent("\u1246"), false);
  assert.equal(isEthiopicSyllableQwaPresent("plain text"), false);
});
