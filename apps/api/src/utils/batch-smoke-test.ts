import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalShortTailedBirdPresent } from "./is-kangxi-radical-short-tailed-bird-present";

assert.equal(isKangxiRadicalShortTailedBirdPresent(""), false);
assert.equal(isKangxiRadicalShortTailedBirdPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalShortTailedBirdPresent("contains \u2fab radical"), true);
assert.equal(isKangxiRadicalShortTailedBirdPresent("\u2fab"), true);
assert.equal(isKangxiRadicalShortTailedBirdPresent("nearby radical \u2faa"), false);
