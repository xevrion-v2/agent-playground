import {
  isRightToLeftMarkPresent,
  isLeftToRightMarkPresent,
  isPopDirectionalFormatPresent,
  isMixedDirectionalText,
} from "./directionalMarks";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("directionalMarks", () => {
  it("detects RTL mark", () => {
    assert.equal(isRightToLeftMarkPresent("\u200FHello"), true);
  });

  it("detects LTR mark", () => {
    assert.equal(isLeftToRightMarkPresent("Hello\u200E"), true);
  });

  it("detects PDF mark", () => {
    assert.equal(isPopDirectionalFormatPresent("Hello\u200C"), true);
  });

  it("detects mixed directional text", () => {
    assert.equal(isMixedDirectionalText("\u200FHello\u200EWorld"), true);
  });

  it("returns false for clean text", () => {
    assert.equal(isMixedDirectionalText("Hello World"), false);
  });

  it("handles empty string", () => {
    assert.equal(isRightToLeftMarkPresent(""), false);
  });
});
