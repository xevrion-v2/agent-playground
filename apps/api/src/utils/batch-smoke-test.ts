import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalSlavePresent } from "./is-kangxi-radical-slave-present";

assert.equal(isKangxiRadicalSlavePresent(""), false);
assert.equal(isKangxiRadicalSlavePresent("plain ascii text"), false);
assert.equal(isKangxiRadicalSlavePresent("contains \u2faa radical"), true);
assert.equal(isKangxiRadicalSlavePresent("\u2faa"), true);
assert.equal(isKangxiRadicalSlavePresent("nearby radical \u2fab"), false);
