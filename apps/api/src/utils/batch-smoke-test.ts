import assert from "node:assert/strict";

import { $fn as isKangxiRadicalLifePresent } from "./is-kangxi-radical-life-present";

assert.equal(isKangxiRadicalLifePresent(""), false);
assert.equal(isKangxiRadicalLifePresent("plain ascii text"), false);
assert.equal(isKangxiRadicalLifePresent("contains \u2f63 radical"), true);
assert.equal(isKangxiRadicalLifePresent("\u2f63"), true);
assert.equal(isKangxiRadicalLifePresent("nearby radical \u2f62"), false);

console.log("API utils smoke tests passed");
