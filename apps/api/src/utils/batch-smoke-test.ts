import assert from "node:assert/strict";

import { $fn as isKangxiRadicalTilePresent } from "./is-kangxi-radical-tile-present";

assert.equal(isKangxiRadicalTilePresent(""), false);
assert.equal(isKangxiRadicalTilePresent("plain ascii text"), false);
assert.equal(isKangxiRadicalTilePresent("contains \u2f61 radical"), true);
assert.equal(isKangxiRadicalTilePresent("\u2f61"), true);
assert.equal(isKangxiRadicalTilePresent("nearby radical \u2f60"), false);

console.log("API utils smoke tests passed");
