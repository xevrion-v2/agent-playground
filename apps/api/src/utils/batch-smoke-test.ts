import assert from "node:assert/strict";

import { $fn as isCjkRadicalCSimplifiedBirdPresent } from "./is-cjk-radical-c-simplified-bird-present";

assert.equal(isCjkRadicalCSimplifiedBirdPresent(""), false);
assert.equal(isCjkRadicalCSimplifiedBirdPresent("plain ascii text"), false);
assert.equal(isCjkRadicalCSimplifiedBirdPresent("contains \u2ee6 radical"), true);
assert.equal(isCjkRadicalCSimplifiedBirdPresent("\u2ee6"), true);
assert.equal(isCjkRadicalCSimplifiedBirdPresent("nearby radical \u2ee5"), false);

console.log("API utils smoke tests passed");

