import assert from "node:assert/strict";

import { isLeftTranspositionBracketPresent } from "./is-left-transposition-bracket-present";

assert.equal(isLeftTranspositionBracketPresent("abc\u2e09def"), true);
assert.equal(isLeftTranspositionBracketPresent("\u2e09"), true);
assert.equal(isLeftTranspositionBracketPresent("abc(def)"), false);
assert.equal(isLeftTranspositionBracketPresent(""), false);
