import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalFlyPresent } from "./is-kangxi-radical-fly-present";

assert.equal(isKangxiRadicalFlyPresent(""), false);
assert.equal(isKangxiRadicalFlyPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalFlyPresent("contains \u2fb6 radical"), true);
assert.equal(isKangxiRadicalFlyPresent("\u2fb6"), true);
assert.equal(isKangxiRadicalFlyPresent("nearby radical \u2fb7"), false);
