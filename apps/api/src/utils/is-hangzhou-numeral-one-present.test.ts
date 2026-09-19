import assert from "node:assert/strict";

import { $fn } from "./is-hangzhou-numeral-one-present";

assert.equal($fn("contains 〡"), true);
assert.equal($fn("contains 〢"), false);
assert.equal($fn("plain ascii"), false);
