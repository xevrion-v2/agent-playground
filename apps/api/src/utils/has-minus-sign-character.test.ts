import assert from "node:assert/strict";

import { hasMinusSignCharacter } from "./has-minus-sign-character.ts";

assert.equal(hasMinusSignCharacter("pre-order"), true);
assert.equal(hasMinusSignCharacter("plain"), false);
assert.equal(hasMinusSignCharacter("-leading"), true);
assert.equal(hasMinusSignCharacter(""), false);

console.log("hasMinusSignCharacter tests passed");
