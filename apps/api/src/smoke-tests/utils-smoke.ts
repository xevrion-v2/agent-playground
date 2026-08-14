import { strict as assert } from "node:assert";

import { isHangulJamoJungseongWeoPresent } from "../utils/is-hangul-jamo-jungseong-weo-present";

assert.equal(isHangulJamoJungseongWeoPresent(""), false);
assert.equal(isHangulJamoJungseongWeoPresent("plain latin text"), false);
assert.equal(isHangulJamoJungseongWeoPresent("\u116E"), false);
assert.equal(isHangulJamoJungseongWeoPresent("before \u116F after"), true);

console.log("API utility smoke tests passed.");
