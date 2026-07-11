import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalLeatherPresent } from "./is-kangxi-radical-leather-present";

assert.equal(isKangxiRadicalLeatherPresent(""), false);
assert.equal(isKangxiRadicalLeatherPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalLeatherPresent("contains \u2fb0 radical"), true);
assert.equal(isKangxiRadicalLeatherPresent("\u2fb0"), true);
assert.equal(isKangxiRadicalLeatherPresent("nearby radical \u2fb1"), false);
