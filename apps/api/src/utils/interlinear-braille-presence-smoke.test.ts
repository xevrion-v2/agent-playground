import test from "node:test";
import assert from "node:assert/strict";

import { isBraillePatternBlankPresent } from "./is-braille-pattern-blank-present";
import { isHalfwidthHangulFillerPresent } from "./is-halfwidth-hangul-filler-present";
import { isInterlinearAnnotationAnchorPresent } from "./is-interlinear-annotation-anchor-present";
import { isInterlinearAnnotationSeparatorPresent } from "./is-interlinear-annotation-separator-present";

test("interlinear and braille character helpers detect only their target characters", () => {
  assert.equal(isInterlinearAnnotationAnchorPresent("anchor\uFFF9marker"), true);
  assert.equal(isInterlinearAnnotationAnchorPresent("anchor marker"), false);

  assert.equal(isInterlinearAnnotationSeparatorPresent("separator\uFFFAmarker"), true);
  assert.equal(isInterlinearAnnotationSeparatorPresent("separator marker"), false);

  assert.equal(isBraillePatternBlankPresent("braille\u2800blank"), true);
  assert.equal(isBraillePatternBlankPresent("braille blank"), false);

  assert.equal(isHalfwidthHangulFillerPresent("hangul\uFFA0filler"), true);
  assert.equal(isHalfwidthHangulFillerPresent("hangul filler"), false);
});
