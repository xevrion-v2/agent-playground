import assert from "node:assert/strict";

import { isDottedTranspositionMarkerPresent } from "./is-dotted-transposition-marker-present";

assert.equal(isDottedTranspositionMarkerPresent("abc\u2e08def"), true);
assert.equal(isDottedTranspositionMarkerPresent("\u2e08"), true);
assert.equal(isDottedTranspositionMarkerPresent("abc(def)"), false);
assert.equal(isDottedTranspositionMarkerPresent(""), false);
