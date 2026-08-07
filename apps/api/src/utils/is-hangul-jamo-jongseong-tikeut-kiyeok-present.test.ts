import { strict as assert } from "node:assert";
import { isHangulJamoJongseongTikeutKiyeokPresent } from "./is-hangul-jamo-jongseong-tikeut-kiyeok-present";

assert.equal(isHangulJamoJongseongTikeutKiyeokPresent("plain text"), false);
assert.equal(isHangulJamoJongseongTikeutKiyeokPresent("contains ᇊ jamo"), true);
assert.equal(isHangulJamoJongseongTikeutKiyeokPresent("contains \\u11CA escape text only"), false);
assert.equal(isHangulJamoJongseongTikeutKiyeokPresent("other jongseong ᇉ"), false);
