import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalFragrantPresent } from "./is-kangxi-radical-fragrant-present";

assert.equal(isKangxiRadicalFragrantPresent(""), false);
assert.equal(isKangxiRadicalFragrantPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalFragrantPresent("contains \u2fb9 radical"), true);
assert.equal(isKangxiRadicalFragrantPresent("\u2fb9"), true);
assert.equal(isKangxiRadicalFragrantPresent("nearby radical \u2fb8"), false);
