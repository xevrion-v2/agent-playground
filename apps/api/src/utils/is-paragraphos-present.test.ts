import assert from "node:assert/strict";

import { isParagraphosPresent } from "./is-paragraphos-present";

assert.equal(isParagraphosPresent("abc\u2e0fdef"), true);
assert.equal(isParagraphosPresent("\u2e0f"), true);
assert.equal(isParagraphosPresent("abc(def)"), false);
assert.equal(isParagraphosPresent(""), false);
