import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalHeadPresent } from "./is-kangxi-radical-head-present";

assert.equal(isKangxiRadicalHeadPresent(""), false);
assert.equal(isKangxiRadicalHeadPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalHeadPresent("contains \u2fb8 radical"), true);
assert.equal(isKangxiRadicalHeadPresent("\u2fb8"), true);
assert.equal(isKangxiRadicalHeadPresent("nearby radical \u2fb7"), false);
