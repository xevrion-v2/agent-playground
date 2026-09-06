import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalTannedLeatherPresent } from "./is-kangxi-radical-tanned-leather-present";

assert.equal(isKangxiRadicalTannedLeatherPresent(""), false);
assert.equal(isKangxiRadicalTannedLeatherPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalTannedLeatherPresent("contains \u2fb1 radical"), true);
assert.equal(isKangxiRadicalTannedLeatherPresent("\u2fb1"), true);
assert.equal(isKangxiRadicalTannedLeatherPresent("nearby radical \u2fb0"), false);
